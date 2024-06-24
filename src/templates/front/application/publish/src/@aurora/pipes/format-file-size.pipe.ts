import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name      : 'formatFileSize',
    pure      : true,
    standalone: true,
})
export class FormatFileSizePipe implements PipeTransform
{
    transform(size: number): { size: number; unit: string; }
    {
        let calcSize = size;
        let calcUnit = 'B';

        // Transform B ---> KB
        if (calcSize >= 1024)
        {
            calcSize = calcSize / 1024;
            calcUnit = 'KB';
        }

        // Transform KB ---> MB
        if (calcSize >= 1024)
        {
            calcSize = calcSize / 1024;
            calcUnit = 'MB';
        }

        return {
            size: Math.round(calcSize),
            unit: calcUnit,
        };
    }
}
