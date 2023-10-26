import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryMime extends StringValueObject
{
    public readonly type: string = 'CommonAttachmentLibraryMime';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibraryMime',
            nullable   : false,
            undefinable: false,
            maxLength  : 50,
        }, validationRules));
    }
}