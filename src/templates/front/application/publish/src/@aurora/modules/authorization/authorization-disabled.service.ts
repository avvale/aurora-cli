import { Injectable } from '@angular/core';
import { IamService } from '@aurora';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationDisabledService
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
        return this.iamService.me?.dPermissions.all || [];
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