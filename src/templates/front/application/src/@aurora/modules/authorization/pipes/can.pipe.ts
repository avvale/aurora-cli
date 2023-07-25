import { Pipe, PipeTransform } from '@angular/core';
import { AuthorizationService } from '../authorization.service';

@Pipe({
    name: 'can',
    pure: true,
    standalone: true,
})
export class CanPipe implements PipeTransform
{
    constructor(
        private readonly authorizationService: AuthorizationService,
    )
    { }

    transform(permissions: string | string[]): boolean
    {
        return this.authorizationService.can(permissions);
    }
}
