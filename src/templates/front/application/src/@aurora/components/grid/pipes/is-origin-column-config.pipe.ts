import { Pipe, PipeTransform } from '@angular/core';
import { ColumnConfig } from '../grid.types';

@Pipe({
    name: 'isOriginColumnConfig',
    standalone: true,
})
export class IsOriginColumnConfigPipe implements PipeTransform
{
    transform(columnsConfig: ColumnConfig[], originColumnsConfig: ColumnConfig[]): boolean
    {
        if (!Array.isArray(originColumnsConfig) || originColumnsConfig.length === 0) return true;
        return JSON.stringify(columnsConfig) === JSON.stringify(originColumnsConfig);
    }
}
