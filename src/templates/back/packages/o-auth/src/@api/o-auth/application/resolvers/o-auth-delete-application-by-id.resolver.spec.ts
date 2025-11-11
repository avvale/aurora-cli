/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthDeleteApplicationByIdHandler,
    OAuthDeleteApplicationByIdResolver,
} from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationByIdResolver', () => {
    let resolver: OAuthDeleteApplicationByIdResolver;
    let handler: OAuthDeleteApplicationByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthDeleteApplicationByIdResolver,
                {
                    provide: OAuthDeleteApplicationByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthDeleteApplicationByIdResolver>(
            OAuthDeleteApplicationByIdResolver,
        );
        handler = module.get<OAuthDeleteApplicationByIdHandler>(
            OAuthDeleteApplicationByIdHandler,
        );
    });

    test('OAuthDeleteApplicationByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthDeleteApplicationByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an application deleted', async () => {
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
