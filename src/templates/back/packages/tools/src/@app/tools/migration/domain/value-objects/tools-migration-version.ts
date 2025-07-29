import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsMigrationVersion extends StringValueObject
{
    public readonly type: string = 'ToolsMigrationVersion';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ToolsMigrationVersion',
            nullable   : false,
            undefinable: false,
            maxLength  : 16,
        }, validationRules));
    }
}