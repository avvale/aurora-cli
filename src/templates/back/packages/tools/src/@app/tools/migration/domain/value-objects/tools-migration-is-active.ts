import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsMigrationIsActive extends BooleanValueObject
{
    public readonly type: string = 'ToolsMigrationIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ToolsMigrationIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}