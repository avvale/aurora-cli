import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials, GraphQLService, OAuthClientGrantType, oAuthCreateCredentials, Utils } from '@aurora';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { first, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationAuroraAdapterService extends AuthenticationService
{
    public authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private readonly httpClient: HttpClient,
        private readonly injector: Injector,
        private readonly router: Router,
    )
    {
        super();
    }

    // ---- customization ----
    // get graphqlService across injector to avoid cyclic dependency
    // TODO, ver como desde el contructor poder esperar a tener la instancia de apollo construida, con el fordward??
    get graphqlService(): GraphQLService
    {
        return this.injector.get(GraphQLService);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token, refresh token and credentials
     */
    get accessToken(): string
    {
        return this.credentials?.accessToken ?? '';
    }

    get refreshToken(): string
    {
        return this.credentials?.refreshToken ?? '';
    }

    set credentials(credentials: Credentials)
    {
        if (credentials)
        {
            // remove __typename property from
            Utils.removeKeys(credentials, ['__typename']);

            localStorage.setItem('credentials', btoa(JSON.stringify(credentials)));
        }
    }

    get credentials(): Credentials
    {
        const credentials = localStorage.getItem('credentials') && atob(localStorage.getItem('credentials'));

        if (credentials) return JSON.parse(credentials);

        return null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    clear(): void
    {
        localStorage.removeItem('credentials');
    }

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this.httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this.httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string; }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if (this.authenticated)
        {
            return throwError(() => 'User is already logged in.');
        }

        return this.graphqlService
            .client()
            .mutate({
                mutation : oAuthCreateCredentials,
                variables: {
                    payload: {
                        username : credentials.email,
                        password : credentials.password,
                        grantType: OAuthClientGrantType.PASSWORD,
                    },
                },
            })
            .pipe(
                switchMap((response: any) =>
                {
                    // Store the access token in the local storage
                    this.credentials = response.data.oAuthCreateCredentials;

                    // Set the authenticated flag to true
                    this.authenticated = true;

                    return of(true);
                }),
            );
    }

    /**
     * Sign in using the access token
     */
    signInUsingRefreshToken(): Observable<any>
    {
        // Renew token
        return this.graphqlService
            .client()
            .mutate({
                mutation : oAuthCreateCredentials,
                variables: {
                    payload: {
                        refreshToken: this.refreshToken,
                        grantType   : OAuthClientGrantType.REFRESH_TOKEN,
                    },
                },
            })
            .pipe(
                first(),
                switchMap((response: any) =>
                {
                    // Store the access token in the local storage
                    this.credentials = response.data.oAuthCreateCredentials;

                    // Set the authenticated flag to true
                    this.authenticated = true;

                    return of(true);
                }),
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        this.clear();

        // Set the authenticated flag to false
        this.authenticated = false;

        // Return the observable
        return of(true);
    }

    async signOutAction(): Promise<void>
    {
        this.router.navigate(['/sign-out']);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this.httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this.httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check the access token availability
        if (!this.accessToken)
        {
            this.authenticated = false;
            return of(false);
        }

        // Check the refresh token availability
        if (!this.refreshToken)
        {
            this.authenticated = false;
            return of(false);
        }

        // Check the refresh token expire date
        if (AuthUtils.isTokenExpired(this.refreshToken))
        {
            this.authenticated = false;
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken))
        {
            return this.signInUsingRefreshToken();
        }

        return of(true);
    }
}