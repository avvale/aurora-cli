import { Pipe, PipeTransform } from '@angular/core';
import get from 'lodash-es/get';

@Pipe({
    name: 'getCellValue',
    pure: true,
})
export class GetCellValuePipe implements PipeTransform
{
    transform(object: any, path: string, defaultValue?: any): any
    {
        // check if path is a string and contains '::' this means that has functions operations for postgresql
        // see src/infrastructure/persistence/sequelize/functions/set-sequelize-functions.function.ts from @aurorajs.dev/core
        return get(
            object,
            path.indexOf('::') > -1 ? path.split('::').shift() : path,
            defaultValue,
        );
    }
}
