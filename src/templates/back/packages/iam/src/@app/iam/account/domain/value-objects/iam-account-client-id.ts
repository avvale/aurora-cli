import {
    DataValueObject,
    UuidValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class IamAccountClientId extends UuidValueObject {
    public readonly type: string = 'IamAccountClientId';

    constructor(
        value: string,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamAccountClientId',
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
