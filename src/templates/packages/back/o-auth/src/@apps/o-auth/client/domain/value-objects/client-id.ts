import { DataValueObject, UuidValueObject, ValidationRules } from 'aurora-ts-core';

export class ClientId extends UuidValueObject
{
    public readonly type: 'ClientId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ClientId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}