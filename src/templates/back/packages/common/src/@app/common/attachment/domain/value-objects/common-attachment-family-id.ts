import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentFamilyId extends UuidValueObject
{
    public readonly type: string = 'CommonAttachmentFamilyId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentFamilyId',
            nullable   : true,
            undefinable: true,
            length     : 36,
        }, validationRules), data);
    }
}