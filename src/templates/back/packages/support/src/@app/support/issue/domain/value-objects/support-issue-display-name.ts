import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueDisplayName extends StringValueObject {
    public readonly type: string = 'SupportIssueDisplayName';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportIssueDisplayName',
                    nullable: true,
                    undefinable: true,
                    maxLength: 128,
                },
                validationRules,
            ),
        );
    }
}
