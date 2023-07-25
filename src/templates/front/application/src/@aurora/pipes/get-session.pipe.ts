import { Pipe, PipeTransform } from '@angular/core';
import { SessionService } from '../modules/session/session.service';

@Pipe({
    name: 'getSession',
    pure: true,
    standalone: true,
})
export class GetSessionPipe implements PipeTransform
{
    constructor(
        private readonly sessionService: SessionService,
    )
    { }

    transform(id: string): any
    {
        return this.sessionService.get(id);
    }
}
