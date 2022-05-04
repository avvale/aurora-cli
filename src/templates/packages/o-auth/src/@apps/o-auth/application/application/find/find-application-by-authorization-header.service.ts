import { BadRequestException, Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from 'aurora-ts-core';
import { IApplicationRepository } from '../../domain/application.repository';
import { OAuthApplication } from '../../domain/application.aggregate';
import { ApplicationAuthorizationHeader } from '../../domain/value-objects/application-authorization-header';
import { OAuthClientModel } from '../../../../../@apps/o-auth/client/infrastructure/sequelize/sequelize-client.model';

@Injectable()
export class FindApplicationByAuthorizationHeaderService
{
    constructor(
        private readonly repository: IApplicationRepository,
    ) {}

    public async main(authorizationHeader: ApplicationAuthorizationHeader, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthApplication>
    {
        // eslint-disable-next-line max-len
        if (!authorizationHeader.value.startsWith('Basic ')) throw new BadRequestException(`Authorization header has not a valid value, current value is: ${authorizationHeader.value}`);

        // get code from basic authorization header encrypted in base64
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [basic, encode] = authorizationHeader.value.split(' ');

        // decrypt code from base64 to string
        const decode = Buffer.from(encode, 'base64').toString();

        // check that code only have one :
        if ((decode.match(/:/g) || []).length !== 1) throw new BadRequestException(`Authorization header has not a valid value, current decode value is: ${decode}`);

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
                        model: OAuthClientModel,
                        as   : 'clients',
                    },
                ],
            },
            constraint,
            cQMetadata,
        });
    }
}