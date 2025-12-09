import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueEnvironment extends StringValueObject {
    public readonly type: string = 'SupportIssueEnvironment';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportIssueEnvironment',
                    nullable: true,
                    undefinable: true,
                    maxLength: 36,
                },
                validationRules,
            ),
        );
    }
}
