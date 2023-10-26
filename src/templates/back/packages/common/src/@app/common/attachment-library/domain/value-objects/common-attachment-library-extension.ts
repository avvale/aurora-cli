import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryExtension extends StringValueObject
{
    public readonly type: string = 'CommonAttachmentLibraryExtension';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibraryExtension',
            nullable   : false,
            undefinable: false,
            maxLength  : 10,
        }, validationRules));
    }
}