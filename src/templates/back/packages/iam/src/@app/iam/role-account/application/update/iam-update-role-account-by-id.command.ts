import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamUpdateRoleAccountByIdCommand {
  constructor(
    public readonly payload: {
      roleId: string;
      accountId: string;
    },
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
