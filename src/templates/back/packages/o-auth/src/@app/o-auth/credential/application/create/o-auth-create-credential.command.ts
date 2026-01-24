import { CQMetadata } from '@aurorajs.dev/core';

export class OAuthCreateCredentialCommand {
  constructor(
    public readonly payload: {
      grantType: string;
      accountId: string;
      username?: string;
      clientSecret?: string;
      accessTokenId?: string;
      refreshToken?: string;
      redirect?: string;
    },
    public readonly cQMetadata?: CQMetadata,
  ) {}
}
