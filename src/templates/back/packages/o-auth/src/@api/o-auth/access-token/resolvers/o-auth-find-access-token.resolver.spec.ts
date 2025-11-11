/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthFindAccessTokenHandler,
    OAuthFindAccessTokenResolver,
} from '@api/o-auth/access-token';
import { oAuthMockAccessTokenData } from '@app/o-auth/access-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindAccessTokenResolver', () => {
    let resolver: OAuthFindAccessTokenResolver;
    let handler: OAuthFindAccessTokenHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthFindAccessTokenResolver,
                {
                    provide: OAuthFindAccessTokenHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthFindAccessTokenResolver>(
            OAuthFindAccessTokenResolver,
        );
        handler = module.get<OAuthFindAccessTokenHandler>(
            OAuthFindAccessTokenHandler,
        );
    });

    test('OAuthFindAccessTokenResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthFindAccessTokenResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a accessToken', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockAccessTokenData[0]),
                    ),
            );
            expect(await resolver.main()).toBe(oAuthMockAccessTokenData[0]);
        });
    });
});
