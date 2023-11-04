import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentAttachableId extends UuidValueObject
{
    public readonly type: string = 'CommonAttachmentAttachableId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentAttachableId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}