/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthCreateApplicationClientInput } from '@api/graphql';
import {
    OAuthCreateApplicationClientHandler,
    OAuthCreateApplicationClientResolver,
} from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationClientResolver', () => {
    let resolver: OAuthCreateApplicationClientResolver;
    let handler: OAuthCreateApplicationClientHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthCreateApplicationClientResolver,
                {
                    provide: OAuthCreateApplicationClientHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthCreateApplicationClientResolver>(
            OAuthCreateApplicationClientResolver,
        );
        handler = module.get<OAuthCreateApplicationClientHandler>(
            OAuthCreateApplicationClientHandler,
        );
    });

    test('OAuthCreateApplicationClientResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthCreateApplicationClientResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an applicationClient created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockApplicationClientData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <OAuthCreateApplicationClientInput>(
                        oAuthMockApplicationClientData[0]
                    ),
                ),
            ).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});
