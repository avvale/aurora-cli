import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportCommentDescription extends StringValueObject {
    public readonly type: string = 'SupportCommentDescription';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportCommentDescription',
                    nullable: false,
                    undefinable: false,
                },
                validationRules,
            ),
        );
    }
}
