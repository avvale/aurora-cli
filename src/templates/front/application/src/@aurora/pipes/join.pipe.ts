import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name      : 'join',
    pure      : true,
    standalone: true,
})
export class JoinPipe implements PipeTransform
{
    transform(object: string[], separator: string = ', '): string
    {
        if (!Array.isArray(object)) '';
        return object.join(separator);
    }
}
