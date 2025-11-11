import {
    DataValueObject,
    UuidValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class IamUserId extends UuidValueObject {
    public readonly type: string = 'IamUserId';

    constructor(
        value: string,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamUserId',
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
