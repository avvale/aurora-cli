/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthPaginateRefreshTokensController } from './o-auth-paginate-refresh-tokens.controller';
import { OAuthPaginateRefreshTokensHandler } from '../handlers/o-auth-paginate-refresh-tokens.handler';

// sources
import { refreshTokens } from '../../../../@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthPaginateRefreshTokensController', () =>
{
    let controller: OAuthPaginateRefreshTokensController;
    let handler: OAuthPaginateRefreshTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthPaginateRefreshTokensController,
            ],
            providers: [
                {
                    provide : OAuthPaginateRefreshTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthPaginateRefreshTokensController>(OAuthPaginateRefreshTokensController);
        handler = module.get<OAuthPaginateRefreshTokensHandler>(OAuthPaginateRefreshTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthPaginateRefreshTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a refreshTokens', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : refreshTokens,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : refreshTokens,
            });
        });
    });
});