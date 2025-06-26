import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsProcedureExecutedAt extends TimestampValueObject
{
    public readonly type: string = 'ToolsProcedureExecutedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ToolsProcedureExecutedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}