import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// @apps
import { FindAccessTokenByIdQuery } from '../../../../@apps/o-auth/access-token/application/find/find-access-token-by-id.query';
import { CreateAccessTokenCommand } from '../../../../@apps/o-auth/access-token/application/create/create-access-token.command';
import { OAuthAccessToken, OAuthCreateAccessTokenInput } from '../../../../graphql';
import { OAuthAccessTokenDto, OAuthCreateAccessTokenDto } from '../dto';

@Injectable()
export class OAuthCreateAccessTokenHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthCreateAccessTokenInput | OAuthCreateAccessTokenDto,
        timezone?: string,
    ): Promise<OAuthAccessToken | OAuthAccessTokenDto>
    {
        await this.commandBus.dispatch(new CreateAccessTokenCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindAccessTokenByIdQuery(payload.id, {}, { timezone }));
    }
}