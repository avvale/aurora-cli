/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthPaginateApplicationsHandler,
    OAuthPaginateApplicationsResolver,
} from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateApplicationsResolver', () => {
    let resolver: OAuthPaginateApplicationsResolver;
    let handler: OAuthPaginateApplicationsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthPaginateApplicationsResolver,
                {
                    provide: OAuthPaginateApplicationsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthPaginateApplicationsResolver>(
            OAuthPaginateApplicationsResolver,
        );
        handler = module.get<OAuthPaginateApplicationsHandler>(
            OAuthPaginateApplicationsHandler,
        );
    });

    test('OAuthPaginateApplicationsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthPaginateApplicationsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a oAuthMockApplicationData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: oAuthMockApplicationData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: oAuthMockApplicationData,
            });
        });
    });
});
