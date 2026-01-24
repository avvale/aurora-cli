import { IamAccount, OAuthClient, OAuthCredentials } from '@api/graphql';
import {
  IamFindAccountByIdQuery,
  IamUpdateAccountByIdCommand,
} from '@app/iam/account';
import { IamGetRolesQuery } from '@app/iam/role/application/get/iam-get-roles.query';
import { iamCreatePermissionsFromRoles } from '@app/iam/shared';
import {
  OAuthCreateAccessTokenCommand,
  OAuthFindAccessTokenQuery,
} from '@app/o-auth/access-token';
import { OAuthFindClientByIdQuery } from '@app/o-auth/client';
import { OAuthCreateRefreshTokenCommand } from '@app/o-auth/refresh-token';
import {
  AuditingMeta,
  ICommandBus,
  IQueryBus,
  Utils,
} from '@aurorajs.dev/core';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuthCredentialsDto } from '../dto';

@Injectable()
export class OAuthCreateImpersonalizeCredentialsHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    accountId: string,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<OAuthCredentials | OAuthCredentialsDto> {
    // get account
    const account = await this.queryBus.ask(
      new IamFindAccountByIdQuery(accountId),
    );
    if (!account) throw new UnauthorizedException();

    // get client
    const client = await this.queryBus.ask(
      new OAuthFindClientByIdQuery(account.clientId),
    );
    if (!client) throw new UnauthorizedException();

    // get account to create credential and consolidate permissions
    await this.consolidatePermissions(
      await this.queryBus.ask(
        new IamFindAccountByIdQuery(account.id, {
          include: [
            {
              association: 'roles',
            },
          ],
        }),
      ),
      timezone,
      auditing,
    );

    return await this.createCredential(client, account);
  }

  private async createCredential(
    client: OAuthClient,
    account: IamAccount,
  ): Promise<OAuthCredentials | OAuthCredentialsDto> {
    // create a JWT access token
    const accessTokenId = Utils.uuid();
    await this.commandBus.dispatch(
      new OAuthCreateAccessTokenCommand({
        id: accessTokenId,
        clientId: client.id,
        scopes: account.scopes,
        accountId: account.id,
        name: client.name,
        expiredAccessToken: client.expiredAccessToken,
      }),
    );

    // create a JWT refresh tToken
    await this.commandBus.dispatch(
      new OAuthCreateRefreshTokenCommand({
        id: Utils.uuid(),
        accessTokenId,
        expiredRefreshToken: client.expiredRefreshToken,
      }),
    );

    // find token created with refresh token associated
    const accessToken = await this.queryBus.ask(
      new OAuthFindAccessTokenQuery({
        where: {
          id: accessTokenId,
        },
        include: [
          {
            association: 'refreshToken',
          },
        ],
      }),
    );

    return {
      accessToken: accessToken.token,
      refreshToken: accessToken.refreshToken.token,
    };
  }

  private async consolidatePermissions(
    account: IamAccount,
    timezone?: string,
    auditing?: AuditingMeta,
  ): Promise<IamAccount> {
    const roles = await this.queryBus.ask(
      new IamGetRolesQuery({
        where: {
          id: account.roles.map((role) => role.id),
        },
        include: [{ association: 'permissions' }],
      }),
    );

    // get permissions from roles
    const dPermissions = iamCreatePermissionsFromRoles(roles);

    // check if account permissions are equals
    if (Utils.arraysHasSameValues(account.dPermissions.all, dPermissions.all)) {
      return account;
    }

    account.dPermissions = dPermissions;

    await this.commandBus.dispatch(
      new IamUpdateAccountByIdCommand(
        {
          dPermissions: account.dPermissions,
          id: account.id,
        },
        {},
        {
          timezone,
          repositoryOptions: {
            auditing: {
              ...auditing,
              // overwrite account, because account is not available yet, in this point of application execution
              account,
            },
          },
        },
      ),
    );

    return account;
  }
}
