/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CQMetadata } from '@aurorajs.dev/core';

export class CommonCreatedLangEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        name: string;
        image: string;
        iso6392: string;
        iso6393: string;
        ietf: string;
        customCode: string;
        dir: 'LTR' | 'RTL';
        sort: number;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
