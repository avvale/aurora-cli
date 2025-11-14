import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingSideEffectEvent extends EnumValueObject {
    public readonly type: string = 'AuditingSideEffectEvent';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'AuditingSideEffectEvent',
                    nullable: false,
                    undefinable: false,
                    enumOptions: [
                        'CREATED',
                        'BULK_CREATED',
                        'UPDATED',
                        'BULK_UPDATED',
                        'DELETED',
                        'BULK_DELETED',
                        'RESTORED',
                        'BULK_RESTORED',
                        'UPSERTED',
                    ],
                },
                validationRules,
            ),
        );
    }
}
