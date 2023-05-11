import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class ApplicationAuthorizationHeader extends StringValueObject
{
    public readonly type: 'ApplicationAuthorizationHeader';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'ApplicationAuthorizationHeader',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}