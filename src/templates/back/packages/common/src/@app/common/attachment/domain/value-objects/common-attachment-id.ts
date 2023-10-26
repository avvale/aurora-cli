import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentId extends UuidValueObject
{
    public readonly type: string = 'CommonAttachmentId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}