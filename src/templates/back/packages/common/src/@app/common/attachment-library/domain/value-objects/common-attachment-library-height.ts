import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryHeight extends SmallintValueObject
{
    public readonly type: string = 'CommonAttachmentLibraryHeight';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibraryHeight',
            nullable   : true,
            undefinable: true,
            maxLength  : 5,
            unsigned   : true,
        }, validationRules));
    }
}