import {
    DataValueObject,
    UuidValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class IamRoleId extends UuidValueObject {
    public readonly type: string = 'IamRoleId';

    constructor(
        value: string,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamRoleId',
                    nullable: false,
                    undefinable: false,
                    length: 36,
                },
                validationRules,
            ),
            data,
        );
    }
}
