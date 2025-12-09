import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportCommentAttachments extends JsonValueObject {
    public readonly type: string = 'SupportCommentAttachments';

    constructor(value: any, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'SupportCommentAttachments',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
