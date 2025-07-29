import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsProcedureHash extends StringValueObject
{
    public readonly type: string = 'ToolsProcedureHash';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ToolsProcedureHash',
            nullable   : true,
            undefinable: true,
            maxLength  : 64,
        }, validationRules));
    }
}