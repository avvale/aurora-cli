import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueRowId extends BigintValueObject {
    public readonly type: string = 'SupportIssueRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportIssueRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
