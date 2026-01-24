import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedTenantEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        rowId: number;
        parentId: string;
        name: string;
        code: string;
        logo: any;
        isActive: boolean;
        meta: any;
        accountIds: string[];
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
