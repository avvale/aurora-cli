import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsMigrationUpScript extends StringValueObject
{
    public readonly type: string = 'ToolsMigrationUpScript';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ToolsMigrationUpScript',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}