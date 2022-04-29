import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateAccessTokensController } from './o-auth-create-access-tokens.controller';
import { OAuthCreateAccessTokensHandler } from '../handlers/o-auth-create-access-tokens.handler';

// sources
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthCreateAccessTokensController', () =>
{
    let controller: OAuthCreateAccessTokensController;
    let handler: OAuthCreateAccessTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                OAuthCreateAccessTokensController,
            ],
            providers: [
                {
                    provide : OAuthCreateAccessTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthCreateAccessTokensController>(OAuthCreateAccessTokensController);
        handler = module.get<OAuthCreateAccessTokensHandler>(OAuthCreateAccessTokensHandler);
    });

    describe('main', () =>
    {
        test('OAuthCreateAccessTokensController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an accessTokens created', async () =>
        {
            expect(await controller.main(accessTokens)).toBe(undefined);
        });
    });
});