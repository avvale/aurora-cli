/* eslint-disable key-spacing */
import { OAuthCreatedCredentialEvent } from '@app/o-auth/credential';
import {
  OAuthCredentialAccessTokenId,
  OAuthCredentialAccountId,
  OAuthCredentialClientSecret,
  OAuthCredentialGrantType,
  OAuthCredentialRedirect,
  OAuthCredentialRefreshToken,
  OAuthCredentialUsername,
} from '@app/o-auth/credential/domain/value-objects';
import { LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthCredential extends AggregateRoot {
  grantType: OAuthCredentialGrantType;
  accountId: OAuthCredentialAccountId;
  username: OAuthCredentialUsername;
  clientSecret: OAuthCredentialClientSecret;
  accessTokenId: OAuthCredentialAccessTokenId;
  refreshToken: OAuthCredentialRefreshToken;
  redirect: OAuthCredentialRedirect;

  constructor(
    grantType: OAuthCredentialGrantType,
    accountId: OAuthCredentialAccountId,
    username: OAuthCredentialUsername,
    clientSecret: OAuthCredentialClientSecret,
    accessTokenId: OAuthCredentialAccessTokenId,
    refreshToken: OAuthCredentialRefreshToken,
    redirect: OAuthCredentialRedirect,
  ) {
    super();
    this.grantType = grantType;
    this.accountId = accountId;
    this.username = username;
    this.clientSecret = clientSecret;
    this.accessTokenId = accessTokenId;
    this.refreshToken = refreshToken;
    this.redirect = redirect;
  }

  static register(
    grantType: OAuthCredentialGrantType,
    accountId: OAuthCredentialAccountId,
    username: OAuthCredentialUsername,
    clientSecret: OAuthCredentialClientSecret,
    accessTokenId: OAuthCredentialAccessTokenId,
    refreshToken: OAuthCredentialRefreshToken,
    redirect: OAuthCredentialRedirect,
  ): OAuthCredential {
    return new OAuthCredential(
      grantType,
      accountId,
      username,
      clientSecret,
      accessTokenId,
      refreshToken,
      redirect,
    );
  }

  created(credential: OAuthCredential): void {
    this.apply(
      new OAuthCreatedCredentialEvent(
        credential.grantType.value,
        credential.accountId.value,
        credential.username?.value,
        credential.clientSecret?.value,
        credential.accessTokenId?.value,
        credential.refreshToken?.value,
        credential.redirect?.value,
      ),
    );
  }

  toDTO(): LiteralObject {
    return {
      grantType: this.grantType.value,
      accountId: this.accountId.value,
      username: this.username?.value,
      clientSecret: this.clientSecret?.value,
      accessTokenId: this.accessTokenId?.value,
      refreshToken: this.refreshToken?.value,
      redirect: this.redirect?.value,
    };
  }
}
