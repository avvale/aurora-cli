import { Pipe, PipeTransform } from '@angular/core';
import { dateFromFormat } from '@aurora';

@Pipe({
    name      : 'dateFormat',
    pure      : true,
    standalone: true,
})
export class DateFormatPipe implements PipeTransform
{
    transform(timestamp: string, format: string): string
    {
        return dateFromFormat(timestamp, 'YYYY-MM-DD HH:mm:ss')
            .format(format);
    }
}
