import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateRefreshTokensCommand } from '../../../../@apps/o-auth/refresh-token/application/create/create-refresh-tokens.command';
import { OAuthCreateRefreshTokenInput } from '../../../../graphql';
import { OAuthCreateRefreshTokenDto } from '../dto';

@Injectable()
export class OAuthCreateRefreshTokensHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: OAuthCreateRefreshTokenInput[] | OAuthCreateRefreshTokenDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateRefreshTokensCommand(payload, { timezone }));
        return true;
    }
}