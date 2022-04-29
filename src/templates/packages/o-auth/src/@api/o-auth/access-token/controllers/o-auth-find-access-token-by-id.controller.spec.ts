/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindAccessTokenByIdController } from './o-auth-find-access-token-by-id.controller';
import { OAuthFindAccessTokenByIdHandler } from '../handlers/o-auth-find-access-token-by-id.handler';

// sources
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthFindAccessTokenByIdController', () =>
{
    let controller: OAuthFindAccessTokenByIdController;
    let handler: OAuthFindAccessTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindAccessTokenByIdController,
            ],
            providers: [
                {
                    provide : OAuthFindAccessTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthFindAccessTokenByIdController>(OAuthFindAccessTokenByIdController);
        handler = module.get<OAuthFindAccessTokenByIdHandler>(OAuthFindAccessTokenByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindAccessTokenByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an accessToken by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await controller.main(accessTokens[0].id)).toBe(accessTokens[0]);
        });
    });
});