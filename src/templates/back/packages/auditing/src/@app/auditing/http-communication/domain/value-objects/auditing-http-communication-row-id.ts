import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingHttpCommunicationRowId extends BigintValueObject {
    public readonly type: string = 'AuditingHttpCommunicationRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'AuditingHttpCommunicationRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
