import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials, GraphQLService } from '@aurora';
import { AuthenticationService } from '@aurora/modules/authentication';
import { MsalService } from '@azure/msal-angular';
import { lastValueFrom, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationAzureAdAdapterService extends AuthenticationService
{
    public authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private readonly authService: MsalService,
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

    get credentials(): Credentials
    {
        return;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    clear(): void
    {
        //
    }

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return;
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
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
        this.authService.logoutRedirect();

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