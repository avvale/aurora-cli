/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthPaginateApplicationsClientsHandler,
    OAuthPaginateApplicationsClientsResolver,
} from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateApplicationsClientsResolver', () => {
    let resolver: OAuthPaginateApplicationsClientsResolver;
    let handler: OAuthPaginateApplicationsClientsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthPaginateApplicationsClientsResolver,
                {
                    provide: OAuthPaginateApplicationsClientsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthPaginateApplicationsClientsResolver>(
            OAuthPaginateApplicationsClientsResolver,
        );
        handler = module.get<OAuthPaginateApplicationsClientsHandler>(
            OAuthPaginateApplicationsClientsHandler,
        );
    });

    test('OAuthPaginateApplicationsClientsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthPaginateApplicationsClientsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a oAuthMockApplicationClientData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: oAuthMockApplicationClientData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: oAuthMockApplicationClientData,
            });
        });
    });
});
