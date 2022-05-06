/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteAccessTokensController } from './o-auth-delete-access-tokens.controller';
import { OAuthDeleteAccessTokensHandler } from '../handlers/o-auth-delete-access-tokens.handler';

// sources
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthDeleteAccessTokensController', () =>
{
    let controller: OAuthDeleteAccessTokensController;
    let handler: OAuthDeleteAccessTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteAccessTokensController,
            ],
            providers: [
                {
                    provide : OAuthDeleteAccessTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthDeleteAccessTokensController>(OAuthDeleteAccessTokensController);
        handler = module.get<OAuthDeleteAccessTokensHandler>(OAuthDeleteAccessTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteAccessTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an accessTokens deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens)));
            expect(await controller.main()).toBe(accessTokens);
        });
    });
});