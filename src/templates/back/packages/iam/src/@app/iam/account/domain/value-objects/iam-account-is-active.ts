import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountIsActive extends BooleanValueObject
{
    public readonly type: string = 'IamAccountIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'IamAccountIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}