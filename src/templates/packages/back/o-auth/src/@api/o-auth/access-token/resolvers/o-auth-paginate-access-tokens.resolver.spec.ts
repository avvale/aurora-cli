/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthPaginateAccessTokensResolver } from './o-auth-paginate-access-tokens.resolver';
import { OAuthPaginateAccessTokensHandler } from '../handlers/o-auth-paginate-access-tokens.handler';

// sources
import { accessTokens } from '@app/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthPaginateAccessTokensResolver', () =>
{
    let resolver: OAuthPaginateAccessTokensResolver;
    let handler: OAuthPaginateAccessTokensHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthPaginateAccessTokensResolver,
                {
                    provide : OAuthPaginateAccessTokensHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver    = module.get<OAuthPaginateAccessTokensResolver>(OAuthPaginateAccessTokensResolver);
        handler = module.get<OAuthPaginateAccessTokensHandler>(OAuthPaginateAccessTokensHandler);
    });

    test('OAuthPaginateAccessTokensResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthPaginateAccessTokensResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a accessTokens', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : accessTokens,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : accessTokens,
            });
        });
    });
});