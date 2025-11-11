/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthFindScopeHandler,
    OAuthFindScopeResolver,
} from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindScopeResolver', () => {
    let resolver: OAuthFindScopeResolver;
    let handler: OAuthFindScopeHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                OAuthFindScopeResolver,
                {
                    provide: OAuthFindScopeHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthFindScopeResolver>(OAuthFindScopeResolver);
        handler = module.get<OAuthFindScopeHandler>(OAuthFindScopeHandler);
    });

    test('OAuthFindScopeResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('OAuthFindScopeResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a scope', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockScopeData[0])),
            );
            expect(await resolver.main()).toBe(oAuthMockScopeData[0]);
        });
    });
});
