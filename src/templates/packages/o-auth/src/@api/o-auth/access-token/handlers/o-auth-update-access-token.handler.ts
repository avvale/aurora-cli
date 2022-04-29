import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAccessTokenByIdQuery } from '../../../../@apps/o-auth/access-token/application/find/find-access-token-by-id.query';
import { UpdateAccessTokenCommand } from '../../../../@apps/o-auth/access-token/application/update/update-access-token.command';
import { OAuthAccessToken, OAuthUpdateAccessTokenInput } from '../../../../graphql';
import { OAuthAccessTokenDto, OAuthUpdateAccessTokenDto } from '../dto';

@Injectable()
export class OAuthUpdateAccessTokenHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthUpdateAccessTokenInput | OAuthUpdateAccessTokenDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthAccessToken | OAuthAccessTokenDto>
    {
        await this.commandBus.dispatch(new UpdateAccessTokenCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAccessTokenByIdQuery(payload.id, constraint, { timezone }));
    }
}