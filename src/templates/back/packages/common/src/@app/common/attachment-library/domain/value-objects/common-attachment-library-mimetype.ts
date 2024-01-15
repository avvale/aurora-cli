import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryMimetype extends StringValueObject
{
    public readonly type: string = 'CommonAttachmentLibraryMimetype';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibraryMimetype',
            nullable   : false,
            undefinable: false,
            maxLength  : 63,
        }, validationRules));
    }
}