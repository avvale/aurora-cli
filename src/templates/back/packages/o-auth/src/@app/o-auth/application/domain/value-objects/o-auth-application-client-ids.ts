import { UuidArrayValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthApplicationClientIds extends UuidArrayValueObject {
    public readonly type: string = 'OAuthApplicationClientIds';

    constructor(
        value: string | string[],
        validationRules: ValidationRules = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthApplicationClientIds',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
