import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookPayload extends JsonValueObject {
    public readonly type: string = 'ToolsWebhookPayload';

    constructor(value: any, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsWebhookPayload',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
