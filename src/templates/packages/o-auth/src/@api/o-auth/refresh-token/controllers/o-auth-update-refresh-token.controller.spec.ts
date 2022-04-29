/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateRefreshTokenController } from './o-auth-update-refresh-token.controller';
import { OAuthUpdateRefreshTokenHandler } from '../handlers/o-auth-update-refresh-token.handler';

// sources
import { refreshTokens } from '../../../../@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthUpdateRefreshTokenController', () =>
{
    let controller: OAuthUpdateRefreshTokenController;
    let handler: OAuthUpdateRefreshTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateRefreshTokenController,
            ],
            providers: [
                {
                    provide : OAuthUpdateRefreshTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthUpdateRefreshTokenController>(OAuthUpdateRefreshTokenController);
        handler = module.get<OAuthUpdateRefreshTokenHandler>(OAuthUpdateRefreshTokenHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateRefreshTokenController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a refreshToken created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await controller.main(refreshTokens[0])).toBe(refreshTokens[0]);
        });
    });
});