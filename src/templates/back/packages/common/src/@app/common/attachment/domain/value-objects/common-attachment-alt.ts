import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentAlt extends StringValueObject
{
    public readonly type: string = 'CommonAttachmentAlt';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentAlt',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}