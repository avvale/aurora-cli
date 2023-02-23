/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindRefreshTokenController } from './o-auth-find-refresh-token.controller';
import { OAuthFindRefreshTokenHandler } from '../handlers/o-auth-find-refresh-token.handler';

// sources
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthFindRefreshTokenController', () =>
{
    let controller: OAuthFindRefreshTokenController;
    let handler: OAuthFindRefreshTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindRefreshTokenController,
            ],
            providers: [
                {
                    provide : OAuthFindRefreshTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindRefreshTokenController>(OAuthFindRefreshTokenController);
        handler = module.get<OAuthFindRefreshTokenHandler>(OAuthFindRefreshTokenHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindRefreshTokenController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a refreshToken', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await controller.main()).toBe(refreshTokens[0]);
        });
    });
});