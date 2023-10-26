import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryMeta extends JsonValueObject
{
    public readonly type: string = 'CommonAttachmentLibraryMeta';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibraryMeta',
            nullable   : true,
            undefinable: true,
        }, validationRules));
    }
}