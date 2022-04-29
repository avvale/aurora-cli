/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateAccessTokenResolver } from './o-auth-create-access-token.resolver';
import { OAuthCreateAccessTokenHandler } from '../handlers/o-auth-create-access-token.handler';
import { OAuthCreateAccessTokenInput } from '../../../../graphql';

// sources
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthCreateAccessTokenResolver', () =>
{
    let resolver: OAuthCreateAccessTokenResolver;
    let handler: OAuthCreateAccessTokenHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthCreateAccessTokenResolver,
                {
                    provide : OAuthCreateAccessTokenHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthCreateAccessTokenResolver>(OAuthCreateAccessTokenResolver);
        handler = module.get<OAuthCreateAccessTokenHandler>(OAuthCreateAccessTokenHandler);
    });

    test('OAuthCreateAccessTokenResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateAccessTokenResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an accessToken created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await resolver.main(<OAuthCreateAccessTokenInput>accessTokens[0])).toBe(accessTokens[0]);
        });
    });
});