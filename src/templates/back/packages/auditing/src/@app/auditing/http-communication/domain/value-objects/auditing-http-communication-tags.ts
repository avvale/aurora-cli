import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingHttpCommunicationTags extends JsonValueObject {
    public readonly type: string = 'AuditingHttpCommunicationTags';

    constructor(value: any[], validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'AuditingHttpCommunicationTags',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
