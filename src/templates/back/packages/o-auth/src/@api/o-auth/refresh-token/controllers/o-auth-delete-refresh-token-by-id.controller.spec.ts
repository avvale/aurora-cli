/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteRefreshTokenByIdController } from './o-auth-delete-refresh-token-by-id.controller';
import { OAuthDeleteRefreshTokenByIdHandler } from '../handlers/o-auth-delete-refresh-token-by-id.handler';

// sources
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthDeleteRefreshTokenByIdController', () =>
{
    let controller: OAuthDeleteRefreshTokenByIdController;
    let handler: OAuthDeleteRefreshTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteRefreshTokenByIdController,
            ],
            providers: [
                {
                    provide : OAuthDeleteRefreshTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthDeleteRefreshTokenByIdController>(OAuthDeleteRefreshTokenByIdController);
        handler = module.get<OAuthDeleteRefreshTokenByIdHandler>(OAuthDeleteRefreshTokenByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteRefreshTokenByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an refreshToken deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await controller.main(refreshTokens[0].id)).toBe(refreshTokens[0]);
        });
    });
});