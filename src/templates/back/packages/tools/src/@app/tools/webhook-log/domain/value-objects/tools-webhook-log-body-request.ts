import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookLogBodyRequest extends JsonValueObject {
    public readonly type: string = 'ToolsWebhookLogBodyRequest';

    constructor(value: any, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsWebhookLogBodyRequest',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
