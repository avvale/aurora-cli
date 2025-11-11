import {
    DataValueObject,
    UuidValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class IamAccountId extends UuidValueObject {
    public readonly type: string = 'IamAccountId';

    constructor(
        value: string,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamAccountId',
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
