import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageAccountRecipientIds extends JsonValueObject {
    public readonly type: string = 'MessageMessageAccountRecipientIds';

    constructor(value: any[], validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageMessageAccountRecipientIds',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
