import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsProcedureType extends EnumValueObject {
    public readonly type: string = 'ToolsProcedureType';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsProcedureType',
                    nullable: false,
                    undefinable: false,
                    enumOptions: ['FUNCTION', 'PROCEDURE', 'TRIGGER'],
                },
                validationRules,
            ),
        );
    }
}
