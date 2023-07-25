import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getTranslationIconColor',
    standalone: true,
})
export class GetTranslationIconColorPipe implements PipeTransform
{
    transform(actionsFn: (item: any) => string, object: any): string
    {
        if (actionsFn instanceof Function) return actionsFn(object);
        return 'accent';
    }
}