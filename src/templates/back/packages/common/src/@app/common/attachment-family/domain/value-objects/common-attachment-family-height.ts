import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentFamilyHeight extends SmallintValueObject
{
    public readonly type: string = 'CommonAttachmentFamilyHeight';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentFamilyHeight',
            nullable   : true,
            undefinable: true,
            maxLength  : 5,
            unsigned   : true,
        }, validationRules));
    }
}