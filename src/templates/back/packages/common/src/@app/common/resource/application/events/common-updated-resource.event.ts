/**
 * @aurora-generated
 * @source cliter/common/resource.aurora.yaml
 */
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonUpdatedResourceEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        code: string;
        name: string;
        isActive: boolean;
        hasAttachments: boolean;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
