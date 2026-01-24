import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueManagerJobRegistryQueueName extends StringValueObject {
  public readonly type: string = 'QueueManagerJobRegistryQueueName';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'QueueManagerJobRegistryQueueName',
          nullable: false,
          undefinable: false,
          maxLength: 63,
        },
        validationRules,
      ),
    );
  }
}
