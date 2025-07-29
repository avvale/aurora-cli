import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsMigrationId extends UuidValueObject
{
    public readonly type: string = 'ToolsMigrationId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ToolsMigrationId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}