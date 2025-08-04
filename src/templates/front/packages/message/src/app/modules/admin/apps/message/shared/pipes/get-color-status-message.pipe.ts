import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getColorStatusMessage',
    pure: true,
})
export class GetColorStatusMessagePipe implements PipeTransform
{
    transform(issue: string): string
    {
        switch (issue)
        {
            case 'DRAFT':
                return 'primary';
            case 'SENT':
                return 'accent';
            case 'PENDING':
                return 'warn';
        }
    }
}
