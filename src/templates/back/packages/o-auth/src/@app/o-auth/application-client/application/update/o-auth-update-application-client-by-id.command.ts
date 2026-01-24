import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';

export class OAuthUpdateApplicationClientByIdCommand {
  constructor(
    public readonly payload: {
      applicationId: string;
      clientId: string;
    },
    public readonly constraint?: QueryStatement,
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
