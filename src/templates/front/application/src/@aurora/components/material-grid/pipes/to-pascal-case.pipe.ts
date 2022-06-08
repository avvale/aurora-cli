import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'toPascalCase',
})
export class ToPascalCasePipe implements PipeTransform
{
    transform(text: string): string
    {
        return _.pascalCase(text);
    }
}
