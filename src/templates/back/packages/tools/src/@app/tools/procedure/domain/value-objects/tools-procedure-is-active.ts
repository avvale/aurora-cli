import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsProcedureIsActive extends BooleanValueObject
{
    public readonly type: string = 'ToolsProcedureIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ToolsProcedureIsActive',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}