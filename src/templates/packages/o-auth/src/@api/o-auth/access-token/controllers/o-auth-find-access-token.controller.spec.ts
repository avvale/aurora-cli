/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindAccessTokenController } from './o-auth-find-access-token.controller';
import { OAuthFindAccessTokenHandler } from '../handlers/o-auth-find-access-token.handler';

// sources
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthFindAccessTokenController', () =>
{
    let controller: OAuthFindAccessTokenController;
    let handler: OAuthFindAccessTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindAccessTokenController,
            ],
            providers: [
                {
                    provide : OAuthFindAccessTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindAccessTokenController>(OAuthFindAccessTokenController);
        handler = module.get<OAuthFindAccessTokenHandler>(OAuthFindAccessTokenHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindAccessTokenController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a accessToken', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await controller.main()).toBe(accessTokens[0]);
        });
    });
});