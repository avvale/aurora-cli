import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateRefreshTokensController } from './o-auth-create-refresh-tokens.controller';
import { OAuthCreateRefreshTokensHandler } from '../handlers/o-auth-create-refresh-tokens.handler';

// sources
import { refreshTokens } from '../../../../@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthCreateRefreshTokensController', () =>
{
    let controller: OAuthCreateRefreshTokensController;
    let handler: OAuthCreateRefreshTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthCreateRefreshTokensController,
            ],
            providers: [
                {
                    provide : OAuthCreateRefreshTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthCreateRefreshTokensController>(OAuthCreateRefreshTokensController);
        handler = module.get<OAuthCreateRefreshTokensHandler>(OAuthCreateRefreshTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateRefreshTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an refreshTokens created', async () =>
        {
            expect(await controller.main(refreshTokens)).toBe(undefined);
        });
    });
});