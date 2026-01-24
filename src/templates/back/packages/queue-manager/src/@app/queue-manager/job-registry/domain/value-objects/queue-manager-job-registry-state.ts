import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class QueueManagerJobRegistryState extends EnumValueObject {
  public readonly type: string = 'QueueManagerJobRegistryState';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'QueueManagerJobRegistryState',
          nullable: false,
          undefinable: false,
          enumOptions: [
            'COMPLETED',
            'WAITING',
            'ACTIVE',
            'DELAYED',
            'FAILED',
            'PAUSED',
          ],
        },
        validationRules,
      ),
    );
  }
}
