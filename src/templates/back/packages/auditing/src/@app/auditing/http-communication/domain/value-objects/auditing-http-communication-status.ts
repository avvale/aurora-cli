import { SmallintValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingHttpCommunicationStatus extends SmallintValueObject {
  public readonly type: string = 'AuditingHttpCommunicationStatus';

  constructor(value: number, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'AuditingHttpCommunicationStatus',
          nullable: true,
          undefinable: true,
          unsigned: true,
        },
        validationRules,
      ),
    );
  }
}
