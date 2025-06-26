import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsProcedureUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'ToolsProcedureUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ToolsProcedureUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}