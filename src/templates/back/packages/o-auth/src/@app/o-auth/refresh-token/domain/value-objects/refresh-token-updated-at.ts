import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurora-ts/core';

export class RefreshTokenUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'RefreshTokenUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'RefreshTokenUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}