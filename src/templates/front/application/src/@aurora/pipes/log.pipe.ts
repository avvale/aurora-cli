import { Pipe, PipeTransform } from '@angular/core';
import { log } from '@aurora';

@Pipe({
    name: 'log',
    pure: true,
    standalone: true,
})
export class LogPipe implements PipeTransform
{
    transform(object: any): void
    {
        return log('[DEBUG] Template value printed from LogPipe: ', object);
    }
}
