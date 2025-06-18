import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials, GraphQLService } from '@aurora';
import { AuthenticationService } from '@aurora/modules/authentication';
import { MsalService } from '@azure/msal-angular';
import { lastValueFrom, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationMsEntraIdAdapterService extends AuthenticationService
{
    public authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private readonly msalService: MsalService,
        private readonly router: Router,
    )
    {
        super();
    }

    get graphqlService(): GraphQLService
    {
        return;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token, refresh token and credentials
     */
    get accessToken(): string
    {
        return;
    }

    get refreshToken(): string
    {
        return;
    }

    set credentials(credentials: Credentials)
    {
        //
    }

    set originCredentials(credentials: Credentials)
    {
        //
    }

    get credentials(): Credentials
    {
        return;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    clear(): void
    {
        // delete all local storage
        localStorage.clear();
    }

    isImpersonalized(): boolean
    {
        return false;
    }

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(
        email: string,
        origin: string = window.location.origin,
    ): Observable<boolean>
    {
        return;
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string, token: string): Observable<any>
    {
        return;
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string; }): Observable<any>
    {
        return;
    }

    /**
     * Sign in using the access token
     */
    signInUsingRefreshToken(): Observable<any>
    {
        return;
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        this.msalService.logoutRedirect({
            postLogoutRedirectUri: '/',
        });

        // Remove the access token from the local storage
        this.clear();

        // Set the authenticated flag to false
        this.authenticated = false;

        // Return the observable
        return of(true);
    }

    async signOutAction(): Promise<void>
    {
        await lastValueFrom(
            this.signOut(),
        );

        this.router.navigate(['/']);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string; }): Observable<any>
    {
        return;
    }

    /**
     * Impersonalize
     */
    impersonalize(accountId: string): Observable<any>
    {
        return;
    }

    rollbackImpersonalize(): void
    {
        //
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string; }): Observable<any>
    {
        return;
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        return of(true);
    }
}