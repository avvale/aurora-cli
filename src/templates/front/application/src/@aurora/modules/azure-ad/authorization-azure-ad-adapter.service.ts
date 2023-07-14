import { Injectable } from '@angular/core';
import { IamService } from '@aurora';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationAzureAdAdapterService
{
    /**
     * Constructor
     */
    constructor(
        private readonly iamService: IamService,
    )
    { }

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