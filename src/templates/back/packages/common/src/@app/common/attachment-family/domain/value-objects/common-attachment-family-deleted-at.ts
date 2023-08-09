import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentFamilyDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'CommonAttachmentFamilyDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentFamilyDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}