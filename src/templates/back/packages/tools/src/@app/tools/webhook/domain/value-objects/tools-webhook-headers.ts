import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookHeaders extends JsonValueObject {
    public readonly type: string = 'ToolsWebhookHeaders';

    constructor(value: any, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsWebhookHeaders',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
