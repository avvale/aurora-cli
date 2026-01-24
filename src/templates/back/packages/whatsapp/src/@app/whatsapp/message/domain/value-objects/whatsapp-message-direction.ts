import { EnumValueObject, ValidationRules } from '@aurorajs.dev/core';

export class WhatsappMessageDirection extends EnumValueObject {
  public readonly type: string = 'WhatsappMessageDirection';

  constructor(value: string, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'WhatsappMessageDirection',
          nullable: false,
          undefinable: false,
          enumOptions: ['INPUT', 'OUTPUT'],
        },
        validationRules,
      ),
    );
  }
}
