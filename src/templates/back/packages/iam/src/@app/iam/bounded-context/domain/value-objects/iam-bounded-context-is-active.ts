import {
    BooleanValueObject,
    DataValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class IamBoundedContextIsActive extends BooleanValueObject {
    public readonly type: string = 'IamBoundedContextIsActive';

    constructor(
        value: boolean,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamBoundedContextIsActive',
                    nullable: false,
                    undefinable: false,
                },
                validationRules,
            ),
            data,
        );
    }
}
