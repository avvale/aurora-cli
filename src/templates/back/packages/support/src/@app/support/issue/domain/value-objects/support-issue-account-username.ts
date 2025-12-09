import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueAccountUsername extends StringValueObject {
    public readonly type: string = 'SupportIssueAccountUsername';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportIssueAccountUsername',
                    nullable: true,
                    undefinable: true,
                    maxLength: 128,
                },
                validationRules,
            ),
        );
    }
}
