import { Observable } from 'rxjs';
import { Credentials } from '@aurora';
import { GraphQLService } from '@aurora';

export abstract class AuthenticationService<T = Credentials>
{
    public authenticated: boolean = false;

    // get graphqlService across injector to avoid cyclic dependency
    // TODO, ver como desde el contructor poder esperar a tener la instancia de apollo construida, con el fordward??
    abstract get graphqlService(): GraphQLService;

    abstract get accessToken(): string;

    abstract get refreshToken(): string;

    abstract set credentials(credentials: T);

    abstract set originCredentials(credentials: T);

    abstract get credentials(): T;

    abstract get originCredentials(): T;

    abstract clear(): void;

    abstract isImpersonalized(): boolean

    abstract forgotPassword(email: string): Observable<any>;

    abstract resetPassword(password: string): Observable<any>;

    abstract signIn(credentials: { email: string; password: string; }): Observable<any>;

    abstract signInUsingRefreshToken(): Observable<any>;

    abstract signOut(): Observable<any>;

    abstract impersonalize(accountId: string): Observable<any>;

    abstract rollbackImpersonalize(): void;

    // action to be executed after sign out
    abstract signOutAction(): void

    abstract signUp(user: { name: string; email: string; password: string; company: string; }): Observable<any>;

    abstract unlockSession(credentials: { email: string; password: string; }): Observable<any>;

    /**
     * Check the authentication status
     * @returns {Observable<boolean>}
     */
    abstract check(): Observable<boolean>;
}
