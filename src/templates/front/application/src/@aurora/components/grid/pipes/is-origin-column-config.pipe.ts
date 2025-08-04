import { Pipe, PipeTransform } from '@angular/core';
import { ColumnConfig } from '../grid.types';
import { adaptColumnsConfigForSerialization } from '../functions/adapt-columns-config-for-serialization.function';

@Pipe({
    name: 'isOriginColumnConfig',
})
export class IsOriginColumnConfigPipe implements PipeTransform
{
    transform(columnsConfig: ColumnConfig[], originColumnsConfig: ColumnConfig[]): boolean
    {
        if (!Array.isArray(originColumnsConfig) || originColumnsConfig.length === 0) return true;
        return JSON.stringify(adaptColumnsConfigForSerialization(columnsConfig)) === JSON.stringify(adaptColumnsConfigForSerialization(originColumnsConfig));
    }
}
