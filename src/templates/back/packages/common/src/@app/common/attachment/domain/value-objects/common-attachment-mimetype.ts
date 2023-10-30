import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentMimetype extends StringValueObject
{
    public readonly type: string = 'CommonAttachmentMimetype';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentMimetype',
            nullable   : false,
            undefinable: false,
            maxLength  : 50,
        }, validationRules));
    }
}