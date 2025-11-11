import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsKeyValueValue extends StringValueObject {
    public readonly type: string = 'ToolsKeyValueValue';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsKeyValueValue',
                    nullable: false,
                    undefinable: false,
                },
                validationRules,
            ),
        );
    }
}
