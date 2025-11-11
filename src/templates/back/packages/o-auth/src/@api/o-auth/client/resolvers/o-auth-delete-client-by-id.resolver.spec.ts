/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthDeleteClientByIdHandler,
    OAuthDeleteClientByIdResolver,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteClientByIdResolver', () => {
    let resolver: OAuthDeleteClientByIdResolver;
    let handler: OAuthDeleteClientByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthDeleteClientByIdResolver,
                {
                    provide: OAuthDeleteClientByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthDeleteClientByIdResolver>(
            OAuthDeleteClientByIdResolver,
        );
        handler = module.get<OAuthDeleteClientByIdHandler>(
            OAuthDeleteClientByIdHandler,
        );
    });

    test('OAuthDeleteClientByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthDeleteClientByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an client deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockClientData[0])),
            );
            expect(await resolver.main(oAuthMockClientData[0].id)).toBe(
                oAuthMockClientData[0],
            );
        });
    });
});
