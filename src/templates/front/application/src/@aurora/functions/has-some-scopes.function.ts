import { IamService } from '@aurora';

export const hasSomeScopes = (
    iamService: IamService,
    scopes: string | string[],
): boolean =>
{
    return iamService.me.scopes.some(scope => scopes.includes(scope));
};
