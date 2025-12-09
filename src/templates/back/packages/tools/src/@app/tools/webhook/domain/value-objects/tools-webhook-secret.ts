import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookSecret extends StringValueObject {
    public readonly type: string = 'ToolsWebhookSecret';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsWebhookSecret',
                    nullable: true,
                    undefinable: true,
                    maxLength: 128,
                },
                validationRules,
            ),
        );
    }
}
