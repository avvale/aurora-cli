/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthPaginateClientsHandler,
    OAuthPaginateClientsResolver,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateClientsResolver', () => {
    let resolver: OAuthPaginateClientsResolver;
    let handler: OAuthPaginateClientsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthPaginateClientsResolver,
                {
                    provide: OAuthPaginateClientsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthPaginateClientsResolver>(
            OAuthPaginateClientsResolver,
        );
        handler = module.get<OAuthPaginateClientsHandler>(
            OAuthPaginateClientsHandler,
        );
    });

    test('OAuthPaginateClientsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthPaginateClientsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a oAuthMockClientData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: oAuthMockClientData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: oAuthMockClientData,
            });
        });
    });
});
