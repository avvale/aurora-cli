/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteAccessTokensResolver } from './o-auth-delete-access-tokens.resolver';
import { OAuthDeleteAccessTokensHandler } from '../handlers/o-auth-delete-access-tokens.handler';

// sources
import { accessTokens } from '@app/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthDeleteAccessTokensResolver', () =>
{
    let resolver: OAuthDeleteAccessTokensResolver;
    let handler: OAuthDeleteAccessTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteAccessTokensResolver,
                {
                    provide : OAuthDeleteAccessTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthDeleteAccessTokensResolver>(OAuthDeleteAccessTokensResolver);
        handler = module.get<OAuthDeleteAccessTokensHandler>(OAuthDeleteAccessTokensHandler);
    });

    test('OAuthDeleteAccessTokensResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteAccessTokensResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an accessTokens deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens)));
            expect(await resolver.main()).toBe(accessTokens);
        });
    });
});