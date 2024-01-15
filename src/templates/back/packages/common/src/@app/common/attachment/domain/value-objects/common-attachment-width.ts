import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentWidth extends IntValueObject
{
    public readonly type: string = 'CommonAttachmentWidth';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentWidth',
            nullable   : true,
            undefinable: true,
            unsigned   : true,
        }, validationRules));
    }
}