import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'CommonAttachmentLibraryDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibraryDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}