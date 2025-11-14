import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueManagerJobRegistryJobName extends StringValueObject {
    public readonly type: string = 'QueueManagerJobRegistryJobName';

    constructor(value: string, validationRules: ValidationRules = {}) {
        super(
            value,
            Object.assign(
                {
                    name: 'QueueManagerJobRegistryJobName',
                    nullable: true,
                    undefinable: true,
                    maxLength: 63,
                },
                validationRules,
            ),
        );
    }
}
