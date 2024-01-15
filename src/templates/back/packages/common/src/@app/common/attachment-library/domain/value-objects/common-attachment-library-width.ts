import { IntValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryWidth extends IntValueObject
{
    public readonly type: string = 'CommonAttachmentLibraryWidth';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibraryWidth',
            nullable   : false,
            undefinable: false,
            unsigned   : true,
        }, validationRules));
    }
}