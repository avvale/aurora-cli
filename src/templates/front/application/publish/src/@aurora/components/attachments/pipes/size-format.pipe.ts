import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name      : 'sizeFormat',
    standalone: true,
})
export class SizeFormatPipe implements PipeTransform
{
    transform(sizeValue: number): string
    {
        const size = Math.round(sizeValue / 1024); // convert bytes y kilobytes
        if (size > 1024)
        {
            return Math.round((size / 1024) * 100) / 100 + ' Mb';
        }
        else
        {
            return size + ' Kb';
        }
    }
}
