/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateAccessTokenResolver } from './o-auth-update-access-token.resolver';
import { OAuthUpdateAccessTokenHandler } from '../handlers/o-auth-update-access-token.handler';
import { OAuthUpdateAccessTokenInput } from '../../../../graphql';

// sources
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthUpdateAccessTokenResolver', () =>
{
    let resolver: OAuthUpdateAccessTokenResolver;
    let handler: OAuthUpdateAccessTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateAccessTokenResolver,
                {
                    provide : OAuthUpdateAccessTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthUpdateAccessTokenResolver>(OAuthUpdateAccessTokenResolver);
        handler = module.get<OAuthUpdateAccessTokenHandler>(OAuthUpdateAccessTokenHandler);
    });

    test('OAuthUpdateAccessTokenResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateAccessTokenResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a accessToken created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await resolver.main(<OAuthUpdateAccessTokenInput>accessTokens[0])).toBe(accessTokens[0]);
        });
    });
});