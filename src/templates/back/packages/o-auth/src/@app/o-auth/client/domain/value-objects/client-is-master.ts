import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurora-ts/core';

export class ClientIsMaster extends BooleanValueObject
{
    public readonly type: string = 'ClientIsMaster';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ClientIsMaster',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}