/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteAccessTokenByIdController } from './o-auth-delete-access-token-by-id.controller';
import { OAuthDeleteAccessTokenByIdHandler } from '../handlers/o-auth-delete-access-token-by-id.handler';

// sources
import { accessTokens } from '@app/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthDeleteAccessTokenByIdController', () =>
{
    let controller: OAuthDeleteAccessTokenByIdController;
    let handler: OAuthDeleteAccessTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteAccessTokenByIdController,
            ],
            providers: [
                {
                    provide : OAuthDeleteAccessTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthDeleteAccessTokenByIdController>(OAuthDeleteAccessTokenByIdController);
        handler = module.get<OAuthDeleteAccessTokenByIdHandler>(OAuthDeleteAccessTokenByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteAccessTokenByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an accessToken deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await controller.main(accessTokens[0].id)).toBe(accessTokens[0]);
        });
    });
});