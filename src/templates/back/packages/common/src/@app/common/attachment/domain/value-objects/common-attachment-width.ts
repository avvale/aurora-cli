import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentWidth extends SmallintValueObject
{
    public readonly type: string = 'CommonAttachmentWidth';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentWidth',
            nullable   : true,
            undefinable: true,
            maxLength  : 5,
            unsigned   : true,
        }, validationRules));
    }
}