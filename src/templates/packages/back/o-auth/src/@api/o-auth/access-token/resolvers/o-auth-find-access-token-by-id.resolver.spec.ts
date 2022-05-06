/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindAccessTokenByIdResolver } from './o-auth-find-access-token-by-id.resolver';
import { OAuthFindAccessTokenByIdHandler } from '../handlers/o-auth-find-access-token-by-id.handler';

// sources
import { accessTokens } from '@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthFindAccessTokenByIdResolver', () =>
{
    let resolver: OAuthFindAccessTokenByIdResolver;
    let handler: OAuthFindAccessTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindAccessTokenByIdResolver,
                {
                    provide : OAuthFindAccessTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindAccessTokenByIdResolver>(OAuthFindAccessTokenByIdResolver);
        handler = module.get<OAuthFindAccessTokenByIdHandler>(OAuthFindAccessTokenByIdHandler);
    });

    test('OAuthFindAccessTokenByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindAccessTokenByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an accessToken by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await resolver.main(accessTokens[0].id)).toBe(accessTokens[0]);
        });
    });
});