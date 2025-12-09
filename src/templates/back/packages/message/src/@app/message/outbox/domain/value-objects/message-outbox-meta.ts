import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageOutboxMeta extends JsonValueObject {
    public readonly type: string = 'MessageOutboxMeta';

    constructor(value: any, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageOutboxMeta',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
