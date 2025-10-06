import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'map',
    pure: true,
})
export class MapPipe implements PipeTransform
{
    transform(arr: any[], field: string): any[]
    {
        if (!Array.isArray(arr)) return [];
        return arr.map(item => item[field]);
    }
}
