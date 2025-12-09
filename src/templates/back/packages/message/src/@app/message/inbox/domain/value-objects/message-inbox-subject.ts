import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageInboxSubject extends StringValueObject {
    public readonly type: string = 'MessageInboxSubject';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageInboxSubject',
                    nullable: false,
                    undefinable: false,
                    maxLength: 255,
                },
                validationRules,
            ),
        );
    }
}
