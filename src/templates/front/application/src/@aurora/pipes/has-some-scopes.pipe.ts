import { Pipe, PipeTransform } from '@angular/core';
import { hasSomeScopes, IamService } from '@aurora';

@Pipe({
    name: 'hasSomeScopes',
    pure: true,
})
export class HasSomeScopesPipe implements PipeTransform
{
    constructor(
        private readonly iamService: IamService,
    ) {}

    transform(scopes: string | string[]): boolean
    {
        return hasSomeScopes(this.iamService, scopes)
    }
}
