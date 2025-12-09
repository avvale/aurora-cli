import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportCommentDisplayName extends StringValueObject {
    public readonly type: string = 'SupportCommentDisplayName';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportCommentDisplayName',
                    nullable: true,
                    undefinable: true,
                    maxLength: 128,
                },
                validationRules,
            ),
        );
    }
}
