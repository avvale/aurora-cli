import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappTimelineWabaContactId extends StringValueObject {
  public readonly type: string = 'WhatsappTimelineWabaContactId';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'WhatsappTimelineWabaContactId',
          nullable: false,
          undefinable: false,
          maxLength: 36,
        },
        validationRules,
      ),
    );
  }
}
