import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentSize extends IntValueObject
{
    public readonly type: string = 'CommonAttachmentSize';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentSize',
            nullable   : false,
            undefinable: false,
            unsigned   : true,
        }, validationRules));
    }
}