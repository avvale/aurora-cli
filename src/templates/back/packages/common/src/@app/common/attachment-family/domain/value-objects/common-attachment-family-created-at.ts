import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentFamilyCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'CommonAttachmentFamilyCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentFamilyCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}