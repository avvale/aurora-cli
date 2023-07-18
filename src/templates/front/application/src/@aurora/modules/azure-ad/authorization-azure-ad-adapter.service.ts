import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationAzureAdAdapterService
{
    get permissions(): string[]
    {
        return [];
    }

    /**
     * @param permissions
     * Method to check permissions
     */
    can(permissions: string | string[]): boolean
    {
        return true;
    }
}