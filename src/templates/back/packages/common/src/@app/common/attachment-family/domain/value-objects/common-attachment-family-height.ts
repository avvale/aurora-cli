import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentFamilyHeight extends IntValueObject
{
    public readonly type: string = 'CommonAttachmentFamilyHeight';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentFamilyHeight',
            nullable   : true,
            undefinable: true,
            unsigned   : true,
        }, validationRules));
    }
}