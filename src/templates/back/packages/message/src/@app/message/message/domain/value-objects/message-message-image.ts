import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageImage extends JsonValueObject {
    public readonly type: string = 'MessageMessageImage';

    constructor(value: any, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageMessageImage',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
