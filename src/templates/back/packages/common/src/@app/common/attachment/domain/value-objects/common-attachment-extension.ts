import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentExtension extends StringValueObject
{
    public readonly type: string = 'CommonAttachmentExtension';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentExtension',
            nullable   : false,
            undefinable: false,
            maxLength  : 10,
        }, validationRules));
    }
}