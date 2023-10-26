import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class CommonAttachmentLibraryWidth extends SmallintValueObject
{
    public readonly type: string = 'CommonAttachmentLibraryWidth';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CommonAttachmentLibraryWidth',
            nullable   : true,
            undefinable: true,
            maxLength  : 5,
            unsigned   : true,
        }, validationRules));
    }
}