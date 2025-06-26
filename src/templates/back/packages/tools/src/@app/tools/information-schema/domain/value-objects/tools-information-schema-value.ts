import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsInformationSchemaValue extends JsonValueObject
{
    public readonly type: string = 'ToolsInformationSchemaValue';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ToolsInformationSchemaValue',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}