import { UuidArrayValueObject, ValidationRules } from '@aurorajs.dev/core';

export class OAuthClientApplicationIds extends UuidArrayValueObject {
    public readonly type: string = 'OAuthClientApplicationIds';

    constructor(
        value: string | string[],
        validationRules: ValidationRules = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'OAuthClientApplicationIds',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
        );
    }
}
