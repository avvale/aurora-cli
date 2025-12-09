import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageIcon extends StringValueObject {
    public readonly type: string = 'MessageMessageIcon';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageMessageIcon',
                    nullable: true,
                    undefinable: true,
                    maxLength: 64,
                },
                validationRules,
            ),
        );
    }
}
