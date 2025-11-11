/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthDeleteClientsHandler,
    OAuthDeleteClientsResolver,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteClientsResolver', () => {
    let resolver: OAuthDeleteClientsResolver;
    let handler: OAuthDeleteClientsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthDeleteClientsResolver,
                {
                    provide: OAuthDeleteClientsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthDeleteClientsResolver>(
            OAuthDeleteClientsResolver,
        );
        handler = module.get<OAuthDeleteClientsHandler>(
            OAuthDeleteClientsHandler,
        );
    });

    test('OAuthDeleteClientsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthDeleteClientsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an oAuthMockClientData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockClientData)),
            );
            expect(await resolver.main()).toBe(oAuthMockClientData);
        });
    });
});
