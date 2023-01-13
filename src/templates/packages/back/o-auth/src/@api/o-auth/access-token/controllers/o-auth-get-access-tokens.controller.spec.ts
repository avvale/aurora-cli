/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetAccessTokensController } from './o-auth-get-access-tokens.controller';
import { OAuthGetAccessTokensHandler } from '../handlers/o-auth-get-access-tokens.handler';

// sources
import { accessTokens } from '@app/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthGetAccessTokensController', () =>
{
    let controller: OAuthGetAccessTokensController;
    let handler: OAuthGetAccessTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthGetAccessTokensController,
            ],
            providers: [
                {
                    provide : OAuthGetAccessTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthGetAccessTokensController>(OAuthGetAccessTokensController);
        handler = module.get<OAuthGetAccessTokensHandler>(OAuthGetAccessTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthGetAccessTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a accessTokens', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens)));
            expect(await controller.main()).toBe(accessTokens);
        });
    });
});