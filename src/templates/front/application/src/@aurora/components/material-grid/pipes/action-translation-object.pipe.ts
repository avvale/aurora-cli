import { Pipe, PipeTransform } from '@angular/core';
import { Translatable } from '@aurora/aurora.types';
import { CommonLang } from '@aurora/modules';

/**
 * Check which action to perform depending on whether or not the language exists.
 */
@Pipe({
    name: 'actionTranslationObject',
})
export class ActionTranslationObjectPipe implements PipeTransform
{
    transform(object: Translatable, lang: CommonLang): string
    {
        const langs: string[] = object.dataLang; // get langs from object

        if (langs.indexOf(lang.id) === -1) return 'new';
        return 'edit';
    }
}
