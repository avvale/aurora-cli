import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsProcedureVersion extends StringValueObject
{
    public readonly type: string = 'ToolsProcedureVersion';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ToolsProcedureVersion',
            nullable   : false,
            undefinable: false,
            maxLength  : 16,
        }, validationRules));
    }
}