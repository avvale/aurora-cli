import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsKeyValueId extends UuidValueObject
{
    public readonly type: string = 'ToolsKeyValueId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'ToolsKeyValueId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}