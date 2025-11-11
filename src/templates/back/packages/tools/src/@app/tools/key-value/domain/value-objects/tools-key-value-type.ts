import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsKeyValueType extends EnumValueObject {
    public readonly type: string = 'ToolsKeyValueType';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsKeyValueType',
                    nullable: false,
                    undefinable: false,
                    enumOptions: [
                        'ARRAY',
                        'BOOLEAN',
                        'DATE',
                        'NUMBER',
                        'OBJECT',
                        'SECRET',
                        'STRING',
                        'TIME',
                        'TIMESTAMP',
                    ],
                },
                validationRules,
            ),
        );
    }
}
