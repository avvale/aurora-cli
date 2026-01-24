import { JsonValueObject, ValidationRules } from '@aurorajs.dev/core';

export class SupportCommentScreenRecording extends JsonValueObject {
  public readonly type: string = 'SupportCommentScreenRecording';

  constructor(value: any, validationRules: ValidationRules = {}) {
    super(
      value,
      Object.assign(
        {
          name: 'SupportCommentScreenRecording',
          nullable: true,
          undefinable: true,
        },
        validationRules,
      ),
    );
  }
}
