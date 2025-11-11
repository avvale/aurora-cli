/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthDeleteScopeByIdHandler,
    OAuthDeleteScopeByIdResolver,
} from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteScopeByIdResolver', () => {
    let resolver: OAuthDeleteScopeByIdResolver;
    let handler: OAuthDeleteScopeByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthDeleteScopeByIdResolver,
                {
                    provide: OAuthDeleteScopeByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthDeleteScopeByIdResolver>(
            OAuthDeleteScopeByIdResolver,
        );
        handler = module.get<OAuthDeleteScopeByIdHandler>(
            OAuthDeleteScopeByIdHandler,
        );
    });

    test('OAuthDeleteScopeByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthDeleteScopeByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an scope deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockScopeData[0])),
            );
            expect(await resolver.main(oAuthMockScopeData[0].id)).toBe(
                oAuthMockScopeData[0],
            );
        });
    });
});
