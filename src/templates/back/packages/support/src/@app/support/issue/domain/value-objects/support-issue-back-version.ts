import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueBackVersion extends StringValueObject {
    public readonly type: string = 'SupportIssueBackVersion';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportIssueBackVersion',
                    nullable: true,
                    undefinable: true,
                    maxLength: 16,
                },
                validationRules,
            ),
        );
    }
}
