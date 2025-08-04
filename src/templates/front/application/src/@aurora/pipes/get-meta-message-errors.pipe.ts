import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getMetaMessageErrors',
    pure: true,
})
export class GetMetaMessageErrorsPipe implements PipeTransform
{
    transform(meta: any): string
    {
        let errorMessages = '';

        if (meta?.errorMessage)
        {
            errorMessages += meta.errorMessage;
        }

        if (meta?.wabaErrorMessages && Array.isArray(meta.wabaErrorMessages))
        {
            for (const error of meta.wabaErrorMessages)
            {
                if (errorMessages.length > 0) errorMessages += ', ';
                errorMessages += `[${error.reason.status}] ${error.inputPhoneNumber} - ${error.reason.message}`;
            }
        }

        return errorMessages;
    }
}
