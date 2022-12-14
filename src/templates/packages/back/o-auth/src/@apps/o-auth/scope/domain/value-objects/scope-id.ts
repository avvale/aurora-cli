import { DataValueObject, UuidValueObject, ValidationRules } from '@aurora-ts/core';

export class ScopeId extends UuidValueObject
{
    public readonly type: 'ScopeId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ScopeId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}