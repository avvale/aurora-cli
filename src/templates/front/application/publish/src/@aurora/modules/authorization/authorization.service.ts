import { Injectable } from '@angular/core';
import { IamService, log } from '@aurora';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService
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
        // permissions must to be defined to be able to check it
        if (!permissions) return true;

        if (!Array.isArray(permissions)) permissions = [permissions];

        for (const permission of permissions)
        {
            if (!this.permissions.includes(permission))
            {
                log('[DEBUG] Permission denied, require: ' + permission);
                return false;
            }
        }
        return true;
    }
}