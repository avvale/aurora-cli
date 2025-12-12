import {
    DataValueObject,
    UuidValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class SupportCommentExternalParentId extends UuidValueObject {
    public readonly type: string = 'SupportCommentExternalParentId';

    constructor(
        value: string,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportCommentExternalParentId',
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
