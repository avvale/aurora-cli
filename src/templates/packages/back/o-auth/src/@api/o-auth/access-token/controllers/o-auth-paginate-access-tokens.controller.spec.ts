/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthPaginateAccessTokensController } from './o-auth-paginate-access-tokens.controller';
import { OAuthPaginateAccessTokensHandler } from '../handlers/o-auth-paginate-access-tokens.handler';

// sources
import { accessTokens } from '@app/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthPaginateAccessTokensController', () =>
{
    let controller: OAuthPaginateAccessTokensController;
    let handler: OAuthPaginateAccessTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthPaginateAccessTokensController,
            ],
            providers: [
                {
                    provide : OAuthPaginateAccessTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthPaginateAccessTokensController>(OAuthPaginateAccessTokensController);
        handler = module.get<OAuthPaginateAccessTokensHandler>(OAuthPaginateAccessTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthPaginateAccessTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a accessTokens', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : accessTokens,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : accessTokens,
            });
        });
    });
});