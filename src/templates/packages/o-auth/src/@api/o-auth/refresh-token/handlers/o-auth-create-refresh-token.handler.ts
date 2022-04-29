import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// @apps
import { FindRefreshTokenByIdQuery } from '../../../../@apps/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { CreateRefreshTokenCommand } from '../../../../@apps/o-auth/refresh-token/application/create/create-refresh-token.command';
import { OAuthRefreshToken, OAuthCreateRefreshTokenInput } from '../../../../graphql';
import { OAuthRefreshTokenDto, OAuthCreateRefreshTokenDto } from '../dto';

@Injectable()
export class OAuthCreateRefreshTokenHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: OAuthCreateRefreshTokenInput | OAuthCreateRefreshTokenDto,
        timezone?: string,
    ): Promise<OAuthRefreshToken | OAuthRefreshTokenDto>
    {
        await this.commandBus.dispatch(new CreateRefreshTokenCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindRefreshTokenByIdQuery(payload.id, {}, { timezone }));
    }
}