import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageScopeRecipients extends JsonValueObject {
    public readonly type: string = 'MessageMessageScopeRecipients';

    constructor(value: any[], validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageMessageScopeRecipients',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
