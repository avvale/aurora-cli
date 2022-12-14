import { EnumValueObject, ValidationRules } from '@aurora-ts/core';

export class ClientGrantTypeTest extends EnumValueObject
{
    public readonly type: 'ClientGrantTypeTest';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ClientGrantTypeTest',
            nullable   : false,
            undefinable: false,
            enumOptions: ['TEST','TEST_2','TEST_3'],
        }, validationRules));
    }
}