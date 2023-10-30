import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentRelativePathSegments extends JsonValueObject
{
    public readonly type: string = 'CommonAttachmentRelativePathSegments';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentRelativePathSegments',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}