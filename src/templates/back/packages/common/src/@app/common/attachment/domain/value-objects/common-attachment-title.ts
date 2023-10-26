import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentTitle extends StringValueObject
{
    public readonly type: string = 'CommonAttachmentTitle';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentTitle',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}