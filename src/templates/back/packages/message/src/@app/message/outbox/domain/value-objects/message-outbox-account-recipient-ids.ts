import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageOutboxAccountRecipientIds extends JsonValueObject {
    public readonly type: string = 'MessageOutboxAccountRecipientIds';

    constructor(value: any[], validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageOutboxAccountRecipientIds',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
