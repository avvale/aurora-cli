/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteRefreshTokensController } from './o-auth-delete-refresh-tokens.controller';
import { OAuthDeleteRefreshTokensHandler } from '../handlers/o-auth-delete-refresh-tokens.handler';

// sources
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthDeleteRefreshTokensController', () =>
{
    let controller: OAuthDeleteRefreshTokensController;
    let handler: OAuthDeleteRefreshTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteRefreshTokensController,
            ],
            providers: [
                {
                    provide : OAuthDeleteRefreshTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthDeleteRefreshTokensController>(OAuthDeleteRefreshTokensController);
        handler = module.get<OAuthDeleteRefreshTokensHandler>(OAuthDeleteRefreshTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteRefreshTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an refreshTokens deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens)));
            expect(await controller.main()).toBe(refreshTokens);
        });
    });
});