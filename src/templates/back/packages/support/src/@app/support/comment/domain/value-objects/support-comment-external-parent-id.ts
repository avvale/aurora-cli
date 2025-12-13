import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportCommentExternalParentId extends StringValueObject {
    public readonly type: string = 'SupportCommentExternalParentId';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportCommentExternalParentId',
                    nullable: true,
                    undefinable: true,
                    maxLength: 64,
                },
                validationRules,
            ),
        );
    }
}
