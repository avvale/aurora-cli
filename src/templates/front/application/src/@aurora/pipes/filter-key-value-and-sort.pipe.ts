import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name      : 'filterKeyValueAndSort',
    pure      : false,
    standalone: true,
})
export class FilterKeyValueAndSortPipe implements PipeTransform
{
    transform(keyValue: { key:string; value: string; }[], allowedKeys): { key:string; value: string; }[]
    {
        return keyValue.filter(item => allowedKeys.includes(item.key)).sort((a, b) =>
        {
            const indexA = allowedKeys.indexOf(a.key);
            const indexB = allowedKeys.indexOf(b.key);
            if (indexA > indexB)
            {
                return 1;
            }
            else if (indexA < indexB)
            {
                return -1;
            }
            else
            {
                return 0;
            }
        });
    }
}
