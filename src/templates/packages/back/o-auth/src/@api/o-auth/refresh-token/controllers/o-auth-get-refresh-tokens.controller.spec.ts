/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetRefreshTokensController } from './o-auth-get-refresh-tokens.controller';
import { OAuthGetRefreshTokensHandler } from '../handlers/o-auth-get-refresh-tokens.handler';

// sources
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthGetRefreshTokensController', () =>
{
    let controller: OAuthGetRefreshTokensController;
    let handler: OAuthGetRefreshTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthGetRefreshTokensController,
            ],
            providers: [
                {
                    provide : OAuthGetRefreshTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthGetRefreshTokensController>(OAuthGetRefreshTokensController);
        handler = module.get<OAuthGetRefreshTokensHandler>(OAuthGetRefreshTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthGetRefreshTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a refreshTokens', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens)));
            expect(await controller.main()).toBe(refreshTokens);
        });
    });
});