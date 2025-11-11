import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsProcedureName extends StringValueObject {
    public readonly type: string = 'ToolsProcedureName';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsProcedureName',
                    nullable: false,
                    undefinable: false,
                    maxLength: 128,
                },
                validationRules,
            ),
        );
    }
}
