/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindRefreshTokenByIdController } from './o-auth-find-refresh-token-by-id.controller';
import { OAuthFindRefreshTokenByIdHandler } from '../handlers/o-auth-find-refresh-token-by-id.handler';

// sources
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthFindRefreshTokenByIdController', () =>
{
    let controller: OAuthFindRefreshTokenByIdController;
    let handler: OAuthFindRefreshTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindRefreshTokenByIdController,
            ],
            providers: [
                {
                    provide : OAuthFindRefreshTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindRefreshTokenByIdController>(OAuthFindRefreshTokenByIdController);
        handler = module.get<OAuthFindRefreshTokenByIdHandler>(OAuthFindRefreshTokenByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindRefreshTokenByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an refreshToken by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await controller.main(refreshTokens[0].id)).toBe(refreshTokens[0]);
        });
    });
});