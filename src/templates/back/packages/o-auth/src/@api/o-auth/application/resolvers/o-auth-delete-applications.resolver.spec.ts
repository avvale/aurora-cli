/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthDeleteApplicationsHandler,
    OAuthDeleteApplicationsResolver,
} from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationsResolver', () => {
    let resolver: OAuthDeleteApplicationsResolver;
    let handler: OAuthDeleteApplicationsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthDeleteApplicationsResolver,
                {
                    provide: OAuthDeleteApplicationsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthDeleteApplicationsResolver>(
            OAuthDeleteApplicationsResolver,
        );
        handler = module.get<OAuthDeleteApplicationsHandler>(
            OAuthDeleteApplicationsHandler,
        );
    });

    test('OAuthDeleteApplicationsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthDeleteApplicationsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an oAuthMockApplicationData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(oAuthMockApplicationData)),
            );
            expect(await resolver.main()).toBe(oAuthMockApplicationData);
        });
    });
});
