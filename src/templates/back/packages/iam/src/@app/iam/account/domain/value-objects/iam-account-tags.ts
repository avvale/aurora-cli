import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class IamAccountTags extends JsonValueObject {
    public readonly type: string = 'IamAccountTags';

    constructor(value: any[], validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamAccountTags',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
