import { BigintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueManagerQueueRowId extends BigintValueObject {
    public readonly type: string = 'QueueManagerQueueRowId';

    constructor(value: number, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'QueueManagerQueueRowId',
                    nullable: false,
                    undefinable: false,
                    unsigned: false,
                },
                validationRules,
            ),
        );
    }
}
