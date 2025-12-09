import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxBody extends StringValueObject {
    public readonly type: string = 'MessageInboxBody';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageInboxBody',
                    nullable: false,
                    undefinable: false,
                },
                validationRules,
            ),
        );
    }
}
