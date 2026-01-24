import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuditingHttpCommunicationHttpRequest extends JsonValueObject {
  public readonly type: string = 'AuditingHttpCommunicationHttpRequest';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'AuditingHttpCommunicationHttpRequest',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
