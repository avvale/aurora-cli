/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateRefreshTokenResolver } from './o-auth-update-refresh-token.resolver';
import { OAuthUpdateRefreshTokenHandler } from '../handlers/o-auth-update-refresh-token.handler';
import { OAuthUpdateRefreshTokenInput } from '../../../../graphql';

// sources
import { refreshTokens } from '../../../../@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthUpdateRefreshTokenResolver', () =>
{
    let resolver: OAuthUpdateRefreshTokenResolver;
    let handler: OAuthUpdateRefreshTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateRefreshTokenResolver,
                {
                    provide : OAuthUpdateRefreshTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthUpdateRefreshTokenResolver>(OAuthUpdateRefreshTokenResolver);
        handler = module.get<OAuthUpdateRefreshTokenHandler>(OAuthUpdateRefreshTokenHandler);
    });

    test('OAuthUpdateRefreshTokenResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateRefreshTokenResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a refreshToken created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(refreshTokens[0])));
            expect(await resolver.main(<OAuthUpdateRefreshTokenInput>refreshTokens[0])).toBe(refreshTokens[0]);
        });
    });
});