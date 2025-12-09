import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookExternalId extends StringValueObject {
    public readonly type: string = 'ToolsWebhookExternalId';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsWebhookExternalId',
                    nullable: true,
                    undefinable: true,
                    maxLength: 64,
                },
                validationRules,
            ),
        );
    }
}
