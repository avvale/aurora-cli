import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurora-ts/core';

export class ClientIsActive extends BooleanValueObject
{
    public readonly type: string = 'ClientIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ClientIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}