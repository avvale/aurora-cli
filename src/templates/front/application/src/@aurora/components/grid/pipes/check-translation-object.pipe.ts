import { Pipe, PipeTransform } from '@angular/core';
import { CommonLang, Translatable } from '@aurora';

@Pipe({
    name: 'checkTranslationObject',
})
export class CheckTranslationObjectPipe implements PipeTransform
{
    transform(
        object: Translatable,
        activatedLangs: CommonLang[],
        completedClass: string = 'completed-translations',
        uncompletedClass: string = 'uncompleted-translations',
    ): string
    {
        const langIds: string[] = object.dataLang; // get langs from object
        for (const lang of activatedLangs)
        {
            if (langIds.indexOf(lang.id) === -1) return uncompletedClass;
        }
        return completedClass;
    }
}
