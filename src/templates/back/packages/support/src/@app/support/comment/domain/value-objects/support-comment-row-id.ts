import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportCommentRowId extends BigintValueObject {
    public readonly type: string = 'SupportCommentRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportCommentRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
