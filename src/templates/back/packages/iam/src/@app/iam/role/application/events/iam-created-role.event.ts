import { CQMetadata } from '@aurorajs.dev/core';

export class IamCreatedRoleEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        name: string;
        defaultRedirection: string;
        hasHiddenVerticalNavigation: boolean;
        isMaster: boolean;
        permissionIds: string[];
        accountIds: string[];
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
