import {
    DataValueObject,
    UuidValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class SupportCommentParentId extends UuidValueObject {
    public readonly type: string = 'SupportCommentParentId';

    constructor(
        value: string,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportCommentParentId',
                    nullable: true,
                    undefinable: true,
                    length: 36,
                },
                validationRules,
            ),
            data,
        );
    }
}
