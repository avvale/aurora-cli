import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateRefreshTokensResolver } from './o-auth-create-refresh-tokens.resolver';
import { OAuthCreateRefreshTokensHandler } from '../handlers/o-auth-create-refresh-tokens.handler';
import { OAuthCreateRefreshTokenInput } from '../../../../graphql';

// sources
import { refreshTokens } from '../../../../@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthCreateRefreshTokensResolver', () =>
{
    let resolver: OAuthCreateRefreshTokensResolver;
    let handler: OAuthCreateRefreshTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OAuthCreateRefreshTokensResolver,
                {
                    provide : OAuthCreateRefreshTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthCreateRefreshTokensResolver>(OAuthCreateRefreshTokensResolver);
        handler = module.get<OAuthCreateRefreshTokensHandler>(OAuthCreateRefreshTokensHandler);
    });

    test('OAuthCreateRefreshTokensResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateRefreshTokensResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an refreshTokens created', async () =>
        {
            expect(await resolver.main(<OAuthCreateRefreshTokenInput[]>refreshTokens)).toBe(undefined);
        });
    });
});