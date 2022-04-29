import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateAccessTokensResolver } from './o-auth-create-access-tokens.resolver';
import { OAuthCreateAccessTokensHandler } from '../handlers/o-auth-create-access-tokens.handler';
import { OAuthCreateAccessTokenInput } from '../../../../graphql';

// sources
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthCreateAccessTokensResolver', () =>
{
    let resolver: OAuthCreateAccessTokensResolver;
    let handler: OAuthCreateAccessTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateAccessTokensResolver,
                {
                    provide : OAuthCreateAccessTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthCreateAccessTokensResolver>(OAuthCreateAccessTokensResolver);
        handler = module.get<OAuthCreateAccessTokensHandler>(OAuthCreateAccessTokensHandler);
    });

    test('OAuthCreateAccessTokensResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateAccessTokensResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an accessTokens created', async () =>
        {
            expect(await resolver.main(<OAuthCreateAccessTokenInput[]>accessTokens)).toBe(undefined);
        });
    });
});