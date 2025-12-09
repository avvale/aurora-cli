import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportCommentAccountUsername extends StringValueObject {
    public readonly type: string = 'SupportCommentAccountUsername';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportCommentAccountUsername',
                    nullable: true,
                    undefinable: true,
                    maxLength: 128,
                },
                validationRules,
            ),
        );
    }
}
