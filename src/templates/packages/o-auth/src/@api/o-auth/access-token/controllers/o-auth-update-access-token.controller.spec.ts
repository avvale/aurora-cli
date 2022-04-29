/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateAccessTokenController } from './o-auth-update-access-token.controller';
import { OAuthUpdateAccessTokenHandler } from '../handlers/o-auth-update-access-token.handler';

// sources
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthUpdateAccessTokenController', () =>
{
    let controller: OAuthUpdateAccessTokenController;
    let handler: OAuthUpdateAccessTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateAccessTokenController,
            ],
            providers: [
                {
                    provide : OAuthUpdateAccessTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthUpdateAccessTokenController>(OAuthUpdateAccessTokenController);
        handler = module.get<OAuthUpdateAccessTokenHandler>(OAuthUpdateAccessTokenHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateAccessTokenController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a accessToken created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await controller.main(accessTokens[0])).toBe(accessTokens[0]);
        });
    });
});