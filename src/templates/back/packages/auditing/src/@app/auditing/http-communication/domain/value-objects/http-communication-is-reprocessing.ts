import { BooleanValueObject, DataValueObject, ValidationRules } from '@aurorajs.dev/core';

export class HttpCommunicationIsReprocessing extends BooleanValueObject
{
    public readonly type: string = 'HttpCommunicationIsReprocessing';

    constructor(value: boolean, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'HttpCommunicationIsReprocessing',
            nullable   : false,
            undefinable: false,
        }, validationRules), data);
    }
}