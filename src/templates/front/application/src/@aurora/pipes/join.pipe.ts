import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join',
    pure: true,
})
export class JoinPipe implements PipeTransform
{
    transform(arr: any[], separator: string = ', '): string
    {
        if (!Array.isArray(arr)) return '';
        return arr.join(separator);
    }
}
