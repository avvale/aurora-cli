/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateRefreshTokenResolver } from './o-auth-create-refresh-token.resolver';
import { OAuthCreateRefreshTokenHandler } from '../handlers/o-auth-create-refresh-token.handler';
import { OAuthCreateRefreshTokenInput } from '../../../../graphql';

// sources
import { refreshTokens } from '../../../../@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthCreateRefreshTokenResolver', () =>
{
    let resolver: OAuthCreateRefreshTokenResolver;
    let handler: OAuthCreateRefreshTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthCreateRefreshTokenResolver,
                {
                    provide : OAuthCreateRefreshTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthCreateRefreshTokenResolver>(OAuthCreateRefreshTokenResolver);
        handler = module.get<OAuthCreateRefreshTokenHandler>(OAuthCreateRefreshTokenHandler);
    });

    test('OAuthCreateRefreshTokenResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateRefreshTokenResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an refreshToken created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await resolver.main(<OAuthCreateRefreshTokenInput>refreshTokens[0])).toBe(refreshTokens[0]);
        });
    });
});