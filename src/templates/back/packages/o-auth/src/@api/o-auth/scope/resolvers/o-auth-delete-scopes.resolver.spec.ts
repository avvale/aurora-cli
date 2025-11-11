/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthDeleteScopesHandler,
    OAuthDeleteScopesResolver,
} from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteScopesResolver', () => {
    let resolver: OAuthDeleteScopesResolver;
    let handler: OAuthDeleteScopesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthDeleteScopesResolver,
                {
                    provide: OAuthDeleteScopesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthDeleteScopesResolver>(
            OAuthDeleteScopesResolver,
        );
        handler = module.get<OAuthDeleteScopesHandler>(
            OAuthDeleteScopesHandler,
        );
    });

    test('OAuthDeleteScopesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthDeleteScopesResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an oAuthMockScopeData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockScopeData)),
            );
            expect(await resolver.main()).toBe(oAuthMockScopeData);
        });
    });
});
