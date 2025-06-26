import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsProcedureCheckedAt extends TimestampValueObject
{
    public readonly type: string = 'ToolsProcedureCheckedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ToolsProcedureCheckedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}