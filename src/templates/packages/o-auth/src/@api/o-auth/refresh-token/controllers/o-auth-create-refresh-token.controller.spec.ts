/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateRefreshTokenController } from './o-auth-create-refresh-token.controller';
import { OAuthCreateRefreshTokenHandler } from '../handlers/o-auth-create-refresh-token.handler';

// sources
import { refreshTokens } from '../../../../@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthCreateRefreshTokenController', () =>
{
    let controller: OAuthCreateRefreshTokenController;
    let handler: OAuthCreateRefreshTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthCreateRefreshTokenController,
            ],
            providers: [
                {
                    provide : OAuthCreateRefreshTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthCreateRefreshTokenController>(OAuthCreateRefreshTokenController);
        handler = module.get<OAuthCreateRefreshTokenHandler>(OAuthCreateRefreshTokenHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateRefreshTokenController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an refreshToken created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await controller.main(refreshTokens[0])).toBe(refreshTokens[0]);
        });
    });
});