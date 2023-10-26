import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryPath extends StringValueObject
{
    public readonly type: string = 'CommonAttachmentLibraryPath';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibraryPath',
            nullable   : false,
            undefinable: false,
            maxLength  : 2047,
        }, validationRules));
    }
}