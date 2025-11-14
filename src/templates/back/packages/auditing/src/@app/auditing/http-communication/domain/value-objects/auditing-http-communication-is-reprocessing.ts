import {
    BooleanValueObject,
    DataValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class AuditingHttpCommunicationIsReprocessing extends BooleanValueObject {
    public readonly type: string = 'AuditingHttpCommunicationIsReprocessing';

    constructor(
        value: boolean,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'AuditingHttpCommunicationIsReprocessing',
                    nullable: false,
                    undefinable: false,
                },
                validationRules,
            ),
            data,
        );
    }
}
