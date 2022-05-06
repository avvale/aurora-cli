/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindAccessTokenResolver } from './o-auth-find-access-token.resolver';
import { OAuthFindAccessTokenHandler } from '../handlers/o-auth-find-access-token.handler';

// sources
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthFindAccessTokenResolver', () =>
{
    let resolver: OAuthFindAccessTokenResolver;
    let handler: OAuthFindAccessTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindAccessTokenResolver,
                {
                    provide : OAuthFindAccessTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindAccessTokenResolver>(OAuthFindAccessTokenResolver);
        handler = module.get<OAuthFindAccessTokenHandler>(OAuthFindAccessTokenHandler);
    });

    test('OAuthFindAccessTokenResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindAccessTokenResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a accessToken', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await resolver.main()).toBe(accessTokens[0]);
        });
    });
});