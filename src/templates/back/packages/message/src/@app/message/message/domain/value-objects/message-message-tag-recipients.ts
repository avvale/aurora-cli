import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageTagRecipients extends JsonValueObject {
    public readonly type: string = 'MessageMessageTagRecipients';

    constructor(value: any[], validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageMessageTagRecipients',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
