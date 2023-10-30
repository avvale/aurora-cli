import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentIsCropable extends BooleanValueObject
{
    public readonly type: string = 'CommonAttachmentIsCropable';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentIsCropable',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}