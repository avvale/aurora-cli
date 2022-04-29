/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteAccessTokenByIdResolver } from './o-auth-delete-access-token-by-id.resolver';
import { OAuthDeleteAccessTokenByIdHandler } from '../handlers/o-auth-delete-access-token-by-id.handler';

// sources
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

describe('OAuthDeleteAccessTokenByIdResolver', () =>
{
    let resolver: OAuthDeleteAccessTokenByIdResolver;
    let handler: OAuthDeleteAccessTokenByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteAccessTokenByIdResolver,
                {
                    provide : OAuthDeleteAccessTokenByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthDeleteAccessTokenByIdResolver>(OAuthDeleteAccessTokenByIdResolver);
        handler = module.get<OAuthDeleteAccessTokenByIdHandler>(OAuthDeleteAccessTokenByIdHandler);
    });

    test('OAuthDeleteAccessTokenByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteAccessTokenByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an accessToken deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accessTokens[0])));
            expect(await resolver.main(accessTokens[0].id)).toBe(accessTokens[0]);
        });
    });
});