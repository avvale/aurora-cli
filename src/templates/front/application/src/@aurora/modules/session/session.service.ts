import { Injectable } from '@angular/core';
import { Account } from '@aurora/modules/iam/iam.types';
import { CommonLang } from '@aurora/modules/lang/lang.types';
import { Session } from './session.types';
import merge from 'lodash-es/merge';

/**
 * Service to manage the data stored in the localStorage
 */
@Injectable({
    providedIn: 'root',
})
export class SessionService
{
    private sessionName: string = 'session';

    set session(session: Session | null)
    {
        // merges the session, with the current session
        if (session) localStorage.setItem(this.sessionName, btoa(JSON.stringify(merge(this.session ? this.session : {}, session))));
    }

    get session(): Session | null
    {
        const value = localStorage.getItem(this.sessionName);

        // check value is not null
        if (value) return JSON.parse(atob(value)) as Session;
        return null;
    }

    // clear session from local storage
    clearSession(): void
    {
        localStorage.removeItem(this.sessionName);
    }

    // get logged account
    get me(): Account | null
    {
        if (this.session) return this.session.me;
        return null;
    }

    // permissions from logged user
    get permissions(): string[] | null
    {
        if (this.session) return this.session.permissions;
        return null;
    }

    // Database langs are stored in the session to avoid queries to the database,
    // since they are values which are required with high availability.
    get langs(): CommonLang[] | null
    {
        if (this.session) return this.session.langs;
        return null;
    }

    get hasLangs(): boolean
    {
        if (this.session) return Array.isArray(this.session.langs) && this.session.langs.length > 0;
        return false;
    }
}
