import {
    BooleanValueObject,
    DataValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class IamRoleHasHiddenVerticalNavigation extends BooleanValueObject {
    public readonly type: string = 'IamRoleHasHiddenVerticalNavigation';

    constructor(
        value: boolean,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamRoleHasHiddenVerticalNavigation',
                    nullable: true,
                    undefinable: true,
                },
                validationRules,
            ),
            data,
        );
    }
}
