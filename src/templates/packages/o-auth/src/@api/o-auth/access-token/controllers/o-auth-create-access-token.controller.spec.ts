/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateAccessTokenController } from './o-auth-create-access-token.controller';
import { OAuthCreateAccessTokenHandler } from '../handlers/o-auth-create-access-token.handler';

// sources
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthCreateAccessTokenController', () =>
{
    let controller: OAuthCreateAccessTokenController;
    let handler: OAuthCreateAccessTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthCreateAccessTokenController,
            ],
            providers: [
                {
                    provide : OAuthCreateAccessTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthCreateAccessTokenController>(OAuthCreateAccessTokenController);
        handler = module.get<OAuthCreateAccessTokenHandler>(OAuthCreateAccessTokenHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateAccessTokenController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an accessToken created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await controller.main(accessTokens[0])).toBe(accessTokens[0]);
        });
    });
});