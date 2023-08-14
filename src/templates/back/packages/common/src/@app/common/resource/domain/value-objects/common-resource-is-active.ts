import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonResourceIsActive extends BooleanValueObject
{
    public readonly type: string = 'CommonResourceIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonResourceIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}