import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsProcedureIsInstalled extends BooleanValueObject
{
    public readonly type: string = 'ToolsProcedureIsInstalled';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ToolsProcedureIsInstalled',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}