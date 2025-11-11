/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthDeleteRefreshTokenByIdHandler,
    OAuthDeleteRefreshTokenByIdResolver,
} from '@api/o-auth/refresh-token';
import { oAuthMockRefreshTokenData } from '@app/o-auth/refresh-token';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteRefreshTokenByIdResolver', () => {
    let resolver: OAuthDeleteRefreshTokenByIdResolver;
    let handler: OAuthDeleteRefreshTokenByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthDeleteRefreshTokenByIdResolver,
                {
                    provide: OAuthDeleteRefreshTokenByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthDeleteRefreshTokenByIdResolver>(
            OAuthDeleteRefreshTokenByIdResolver,
        );
        handler = module.get<OAuthDeleteRefreshTokenByIdHandler>(
            OAuthDeleteRefreshTokenByIdHandler,
        );
    });

    test('OAuthDeleteRefreshTokenByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthDeleteRefreshTokenByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an refreshToken deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockRefreshTokenData[0]),
                    ),
            );
            expect(await resolver.main(oAuthMockRefreshTokenData[0].id)).toBe(
                oAuthMockRefreshTokenData[0],
            );
        });
    });
});
