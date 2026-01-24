import { IamCreatedTagEvent } from '@app/iam/tag';
import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedTagsEvent {
  constructor(
    public readonly event: {
      payload: IamCreatedTagEvent[];
      cQMetadata?: CQMetadata;
    },
  ) {}
}
