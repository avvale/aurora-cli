import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '@aurora';

@Pipe({
    name: 'dateFormat',
    pure: true,
    standalone: true,
})
export class DateFormatPipe implements PipeTransform
{
    transform(timestamp: string, format: string): string
    {
        return Utils.dateFromFormat(timestamp, 'YYYY-MM-DD HH:mm:ss').format(format);
    }
}
