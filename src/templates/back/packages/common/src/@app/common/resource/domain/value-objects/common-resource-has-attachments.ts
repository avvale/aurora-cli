import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonResourceHasAttachments extends BooleanValueObject
{
    public readonly type: string = 'CommonResourceHasAttachments';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonResourceHasAttachments',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}