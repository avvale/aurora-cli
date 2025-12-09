import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueVideo extends JsonValueObject {
    public readonly type: string = 'SupportIssueVideo';

    constructor(value: any, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportIssueVideo',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
