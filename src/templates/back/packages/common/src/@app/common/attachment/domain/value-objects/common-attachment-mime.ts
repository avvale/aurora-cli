import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentMime extends StringValueObject
{
    public readonly type: string = 'CommonAttachmentMime';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentMime',
            nullable   : false,
            undefinable: false,
            maxLength  : 50,
        }, validationRules));
    }
}