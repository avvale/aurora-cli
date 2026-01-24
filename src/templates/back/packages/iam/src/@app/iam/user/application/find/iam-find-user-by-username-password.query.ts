import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class IamFindUserByUsernamePasswordQuery {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
