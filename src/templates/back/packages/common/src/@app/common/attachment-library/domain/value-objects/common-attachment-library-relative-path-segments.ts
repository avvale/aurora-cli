import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryRelativePathSegments extends JsonValueObject
{
    public readonly type: string = 'CommonAttachmentLibraryRelativePathSegments';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibraryRelativePathSegments',
            nullable   : false,
            undefinable: false,
        }, validationRules));
    }
}