/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonCreatedLangEvent } from '@app/common/lang';
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreatedLangsEvent {
  constructor(
    public readonly event: {
      payload: CommonCreatedLangEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
