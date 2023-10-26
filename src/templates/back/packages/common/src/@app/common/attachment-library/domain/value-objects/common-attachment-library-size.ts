import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibrarySize extends IntValueObject
{
    public readonly type: string = 'CommonAttachmentLibrarySize';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibrarySize',
            nullable   : false,
            undefinable: false,
            maxLength  : 10,
            unsigned   : true,
        }, validationRules));
    }
}