import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentSizes extends JsonValueObject
{
    public readonly type: string = 'CommonAttachmentSizes';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentSizes',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}