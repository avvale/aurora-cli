import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportIssueScreenRecording extends JsonValueObject {
    public readonly type: string = 'SupportIssueScreenRecording';

    constructor(value: any, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportIssueScreenRecording',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
