import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsProcedureDownScript extends StringValueObject
{
    public readonly type: string = 'ToolsProcedureDownScript';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ToolsProcedureDownScript',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}