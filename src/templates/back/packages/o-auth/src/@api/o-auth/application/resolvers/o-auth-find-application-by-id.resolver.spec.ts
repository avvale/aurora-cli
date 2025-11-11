/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthFindApplicationByIdHandler,
    OAuthFindApplicationByIdResolver,
} from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindApplicationByIdResolver', () => {
    let resolver: OAuthFindApplicationByIdResolver;
    let handler: OAuthFindApplicationByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthFindApplicationByIdResolver,
                {
                    provide: OAuthFindApplicationByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthFindApplicationByIdResolver>(
            OAuthFindApplicationByIdResolver,
        );
        handler = module.get<OAuthFindApplicationByIdHandler>(
            OAuthFindApplicationByIdHandler,
        );
    });

    test('OAuthFindApplicationByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthFindApplicationByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an application by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockApplicationData[0]),
                    ),
            );
            expect(await resolver.main(oAuthMockApplicationData[0].id)).toBe(
                oAuthMockApplicationData[0],
            );
        });
    });
});
