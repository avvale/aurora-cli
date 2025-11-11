/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthGetScopesHandler,
    OAuthGetScopesResolver,
} from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetScopesResolver', () => {
    let resolver: OAuthGetScopesResolver;
    let handler: OAuthGetScopesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthGetScopesResolver,
                {
                    provide: OAuthGetScopesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthGetScopesResolver>(OAuthGetScopesResolver);
        handler = module.get<OAuthGetScopesHandler>(OAuthGetScopesHandler);
    });

    test('OAuthGetScopesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthGetScopesResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a oAuthMockScopeData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockScopeData)),
            );
            expect(await resolver.main()).toBe(oAuthMockScopeData);
        });
    });
});
