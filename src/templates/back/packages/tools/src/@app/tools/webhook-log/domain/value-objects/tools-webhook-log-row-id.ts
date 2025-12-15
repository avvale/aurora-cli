import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ToolsWebhookLogRowId extends BigintValueObject {
    public readonly type: string = 'ToolsWebhookLogRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsWebhookLogRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
