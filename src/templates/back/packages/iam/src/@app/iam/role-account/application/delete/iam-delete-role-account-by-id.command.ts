import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamDeleteRoleAccountByIdCommand {
  constructor(
    public readonly roleId: string,
    public readonly accountId: string,
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
