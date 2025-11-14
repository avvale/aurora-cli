import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingHttpCommunicationHttpResponse extends JsonValueObject {
    public readonly type: string = 'AuditingHttpCommunicationHttpResponse';

    constructor(value: any, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'AuditingHttpCommunicationHttpResponse',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
