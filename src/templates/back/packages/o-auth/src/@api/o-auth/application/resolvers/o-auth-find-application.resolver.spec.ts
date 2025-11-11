/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthFindApplicationHandler,
    OAuthFindApplicationResolver,
} from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationResolver', () => {
    let resolver: OAuthFindApplicationResolver;
    let handler: OAuthFindApplicationHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthFindApplicationResolver,
                {
                    provide: OAuthFindApplicationHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthFindApplicationResolver>(
            OAuthFindApplicationResolver,
        );
        handler = module.get<OAuthFindApplicationHandler>(
            OAuthFindApplicationHandler,
        );
    });

    test('OAuthFindApplicationResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthFindApplicationResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a application', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockApplicationData[0]),
                    ),
            );
            expect(await resolver.main()).toBe(oAuthMockApplicationData[0]);
        });
    });
});
