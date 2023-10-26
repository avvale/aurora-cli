import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryFilename extends StringValueObject
{
    public readonly type: string = 'CommonAttachmentLibraryFilename';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibraryFilename',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}