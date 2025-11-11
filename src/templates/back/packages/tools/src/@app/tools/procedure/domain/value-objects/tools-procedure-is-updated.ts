import {
    BooleanValueObject,
    DataValueObject,
    ValidationRules,
} from '@aurorajs.dev/core';

export class ToolsProcedureIsUpdated extends BooleanValueObject {
    public readonly type: string = 'ToolsProcedureIsUpdated';

    constructor(
        value: boolean,
        validationRules: ValidationRules = {},
        data: DataValueObject = {},
    ) {
        super(
            value,
            Object.assign(
                {
                    name: 'ToolsProcedureIsUpdated',
                    nullable: false,
                    undefinable: false,
                },
                validationRules,
            ),
            data,
        );
    }
}
