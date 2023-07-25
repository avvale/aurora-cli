import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'transformDataCell',
    standalone: true,
})
export class TransformDataCellPipe implements PipeTransform
{
    transform(data: any, transformer: (item: any) => any): any
    {
        return transformer ? transformer(data) : data;
    }
}
