import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentPath extends StringValueObject
{
    public readonly type: string = 'CommonAttachmentPath';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentPath',
            nullable   : false,
            undefinable: false,
            maxLength  : 2047,
        }, validationRules));
    }
}