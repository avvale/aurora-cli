import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappTimelineAccounts extends JsonValueObject {
  public readonly type: string = 'WhatsappTimelineAccounts';

  constructor(value: any[], validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'WhatsappTimelineAccounts',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
