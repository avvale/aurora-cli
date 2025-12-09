import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueFrontEnvironment extends StringValueObject {
    public readonly type: string = 'SupportIssueFrontEnvironment';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportIssueFrontEnvironment',
                    nullable: true,
                    undefinable: true,
                    maxLength: 36,
                },
                validationRules,
            ),
        );
    }
}
