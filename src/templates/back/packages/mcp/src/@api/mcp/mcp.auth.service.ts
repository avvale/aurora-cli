import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

type GrantType = 'CLIENT_CREDENTIALS' | 'PASSWORD' | 'REFRESH_TOKEN';

@Injectable()
export class McpAuthService {
    private readonly logger = new Logger(McpAuthService.name);

    private accessToken?: string;
    private refreshToken?: string | null;

    // Tracks how we originally authenticated to choose refresh/retry strategy
    private lastAuthGrant?: Exclude<GrantType, 'REFRESH_TOKEN'>;
    private lastUsername?: string;
    private lastClientSecret?: string;
    private lastPassword?: string;

    constructor(private readonly http: HttpService) {}

    getAuthHeader(): string | undefined {
        return this.accessToken ? `Bearer ${this.accessToken}` : undefined;
    }

    async ensureAuth(): Promise<void> {
        if (this.accessToken) return;

        const envUser = process.env.MCP_AUTH_USERNAME;
        const envClientSecret = process.env.MCP_AUTH_CLIENT_SECRET;

        if (envUser && envClientSecret) {
            await this.loginWithClientCredentials(envUser, envClientSecret);
            return;
        }

        // No env credentials available. The client should call the auth.login tool.
        throw new Error(
            'Authentication required. Call tool "auth.login" with username and password.',
        );
    }

    async loginWithClientCredentials(
        username: string,
        clientSecret: string,
    ): Promise<void> {
        const payload = {
            payload: {
                grantType: 'CLIENT_CREDENTIALS',
                username,
                clientSecret,
            },
        };
        const res = await this.fetchAuthTokens(payload);
        this.setTokens(res.accessToken, res.refreshToken);
        this.lastAuthGrant = 'CLIENT_CREDENTIALS';
        this.lastUsername = username;
        this.lastClientSecret = clientSecret;
        this.lastPassword = undefined;
    }

    async loginWithPassword(username: string, password: string): Promise<void> {
        const payload = {
            payload: {
                grantType: 'PASSWORD',
                username,
                password,
            },
        };
        const res = await this.fetchAuthTokens(payload);
        this.setTokens(res.accessToken, res.refreshToken);
        this.lastAuthGrant = 'PASSWORD';
        this.lastUsername = username;
        this.lastPassword = password;
        this.lastClientSecret = undefined;
    }

    async refreshIfNeeded(): Promise<boolean> {
        if (!this.refreshToken) return false;
        try {
            const payload = {
                payload: {
                    grantType: 'REFRESH_TOKEN',
                    refreshToken: this.refreshToken,
                },
            };
            const res = await this.fetchAuthTokens(payload);
            this.setTokens(res.accessToken, res.refreshToken);
            return true;
        } catch (e) {
            this.logger.warn(
                `Refresh token failed: ${e instanceof Error ? e.message : String(e)}`,
            );
            // Try to re-login using the last method
            if (
                this.lastAuthGrant === 'CLIENT_CREDENTIALS' &&
                this.lastUsername &&
                this.lastClientSecret
            ) {
                await this.loginWithClientCredentials(
                    this.lastUsername,
                    this.lastClientSecret,
                );
                return true;
            }
            if (
                this.lastAuthGrant === 'PASSWORD' &&
                this.lastUsername &&
                this.lastPassword
            ) {
                await this.loginWithPassword(
                    this.lastUsername,
                    this.lastPassword,
                );
                return true;
            }
            return false;
        }
    }

    private setTokens(accessToken: string, refreshToken?: string | null): void {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken ?? null;
    }

    private async fetchAuthTokens(
        variables: Record<string, unknown>,
    ): Promise<{ accessToken: string; refreshToken?: string | null }> {
        const baseURL =
            process.env.SELF_BASE_URL ||
            `http://localhost:${process.env.APP_PORT || 3000}`;
        const AUTH_MUTATION = `
            mutation ($payload: OAuthCreateCredentialsInput!) {
                oAuthCreateCredentials (payload:$payload) {
                    accessToken
                    refreshToken
                }
            }`;

        const { status, data } = await firstValueFrom(
            this.http.post<any>(
                `${baseURL}/graphql`,
                { query: AUTH_MUTATION, variables },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${process.env.MCP_AUTH_BASIC_AUTHORIZATION}`,
                    },
                    validateStatus: () => true,
                    timeout: 30000,
                },
            ),
        );

        if (status === 200 && data?.data?.oAuthCreateCredentials?.accessToken) {
            return {
                accessToken: data.data.oAuthCreateCredentials.accessToken,
                refreshToken:
                    data.data.oAuthCreateCredentials.refreshToken ?? null,
            };
        }

        const errMsg = data?.errors?.[0]?.message ?? JSON.stringify(data);
        throw new Error(`Auth failed (status ${status}): ${errMsg}`);
    }
}
