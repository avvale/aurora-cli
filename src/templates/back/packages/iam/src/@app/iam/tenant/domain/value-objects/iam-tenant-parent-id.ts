import {
    DataValueObject,
    UuidValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class IamTenantParentId extends UuidValueObject {
    public readonly type: string = 'IamTenantParentId';

    constructor(
        value: string,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'IamTenantParentId',
                    nullable: true,
                    undefinable: true,
                    length: 36,
                },
                validationRules,
            ),
            data,
        );
    }
}
