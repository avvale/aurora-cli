import {
  OAuthApplication,
  OAuthIApplicationRepository,
} from '@app/o-auth/application';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OAuthApplicationAuthorizationHeader } from '../../domain/value-objects/o-auth-application-authorization-header';

@Injectable()
export class OAuthFindApplicationByAuthorizationHeaderService {
  constructor(private readonly repository: OAuthIApplicationRepository) {}

  public async main(
    authorizationHeader: OAuthApplicationAuthorizationHeader,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<OAuthApplication> {
    // eslint-disable-next-line max-len
    if (!authorizationHeader.value.startsWith('Basic '))
      throw new BadRequestException(
        `Authorization header has not a valid value, current value is: ${authorizationHeader.value}`,
      );

    // get code from basic authorization header encrypted in base64
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [basic, encode] = authorizationHeader.value.split(' ');

    // decrypt code from base64 to string
    const decode = Buffer.from(encode, 'base64').toString();

    // check that code only have one :
    if ((decode.match(/:/g) || []).length !== 1)
      throw new BadRequestException(
        `Authorization header has not a valid value, current decode value is: ${decode}`,
      );

    // separate code from secret
    const [code, secret] = decode.split(':');

    // get application with clients associated
    return await this.repository.find({
      queryStatement: {
        where: {
          code,
          secret,
        },
        include: [
          {
            association: 'clients',
          },
        ],
      },
      constraint,
      cQMetadata,
    });
  }
}
