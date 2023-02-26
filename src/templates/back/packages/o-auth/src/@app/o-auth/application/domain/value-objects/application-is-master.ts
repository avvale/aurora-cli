import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurora-ts/core';

export class ApplicationIsMaster extends BooleanValueObject
{
    public readonly type: string = 'ApplicationIsMaster';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationIsMaster',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}