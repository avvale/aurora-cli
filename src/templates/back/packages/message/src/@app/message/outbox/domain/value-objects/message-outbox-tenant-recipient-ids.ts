import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageOutboxTenantRecipientIds extends JsonValueObject {
    public readonly type: string = 'MessageOutboxTenantRecipientIds';

    constructor(value: any[], validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageOutboxTenantRecipientIds',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
