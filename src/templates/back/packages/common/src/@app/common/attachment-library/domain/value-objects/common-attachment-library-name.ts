import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryName extends StringValueObject
{
    public readonly type: string = 'CommonAttachmentLibraryName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibraryName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}