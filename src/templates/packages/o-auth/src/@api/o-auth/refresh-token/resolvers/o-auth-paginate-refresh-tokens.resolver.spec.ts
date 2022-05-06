/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthPaginateRefreshTokensResolver } from './o-auth-paginate-refresh-tokens.resolver';
import { OAuthPaginateRefreshTokensHandler } from '../handlers/o-auth-paginate-refresh-tokens.handler';

// sources
import { refreshTokens } from '@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

describe('OAuthPaginateRefreshTokensResolver', () =>
{
    let resolver: OAuthPaginateRefreshTokensResolver;
    let handler: OAuthPaginateRefreshTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthPaginateRefreshTokensResolver,
                {
                    provide : OAuthPaginateRefreshTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver    = module.get<OAuthPaginateRefreshTokensResolver>(OAuthPaginateRefreshTokensResolver);
        handler = module.get<OAuthPaginateRefreshTokensHandler>(OAuthPaginateRefreshTokensHandler);
    });

    test('OAuthPaginateRefreshTokensResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthPaginateRefreshTokensResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a refreshTokens', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : refreshTokens,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : refreshTokens,
            });
        });
    });
});