import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentSort extends SmallintValueObject
{
    public readonly type: string = 'CommonAttachmentSort';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentSort',
            nullable   : true,
            undefinable: true,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}