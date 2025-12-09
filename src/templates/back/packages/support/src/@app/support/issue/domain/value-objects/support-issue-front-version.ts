import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueFrontVersion extends StringValueObject {
    public readonly type: string = 'SupportIssueFrontVersion';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportIssueFrontVersion',
                    nullable: true,
                    undefinable: true,
                    maxLength: 16,
                },
                validationRules,
            ),
        );
    }
}
