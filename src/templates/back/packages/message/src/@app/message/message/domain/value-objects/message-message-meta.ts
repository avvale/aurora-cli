import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class MessageMessageMeta extends JsonValueObject {
    public readonly type: string = 'MessageMessageMeta';

    constructor(value: any, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'MessageMessageMeta',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
