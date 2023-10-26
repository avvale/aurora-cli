import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentHeight extends SmallintValueObject
{
    public readonly type: string = 'CommonAttachmentHeight';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentHeight',
            nullable   : true,
            undefinable: true,
            maxLength  : 5,
            unsigned   : true,
        }, validationRules));
    }
}