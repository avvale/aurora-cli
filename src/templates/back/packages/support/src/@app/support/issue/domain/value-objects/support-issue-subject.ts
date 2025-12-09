import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueSubject extends StringValueObject {
    public readonly type: string = 'SupportIssueSubject';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportIssueSubject',
                    nullable: false,
                    undefinable: false,
                    maxLength: 510,
                },
                validationRules,
            ),
        );
    }
}
