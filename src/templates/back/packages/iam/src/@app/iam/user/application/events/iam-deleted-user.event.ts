import { CQMetadata } from '@aurorajs.dev/core';

export class IamDeletedUserEvent {
  constructor(
    public readonly event: {
      payload: {
        id: string;
        rowId: number;
        accountId: string;
        name: string;
        surname: string;
        avatar: string;
        mobile: string;
        langId: string;
        password: string;
        isTwoFactorAuthenticationEnabled: boolean;
        twoFactorAuthenticationSecret: string;
        rememberToken: string;
        meta: any;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
      };
      cQMetadata?: CQMetadata;
    },
  ) {}
}
