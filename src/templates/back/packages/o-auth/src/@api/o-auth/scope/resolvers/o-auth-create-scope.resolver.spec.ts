/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthCreateScopeInput } from '@api/graphql';
import { OAuthCreateScopeHandler, OAuthCreateScopeResolver } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateScopeResolver', () =>
{
    let resolver: OAuthCreateScopeResolver;
    let handler: OAuthCreateScopeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthCreateScopeResolver,
                {
                    provide : OAuthCreateScopeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthCreateScopeResolver>(OAuthCreateScopeResolver);
        handler = module.get<OAuthCreateScopeHandler>(OAuthCreateScopeHandler);
    });

    test('OAuthCreateScopeResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateScopeResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an scope created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData[0])));
            expect(await resolver.main(<OAuthCreateScopeInput>oAuthMockScopeData[0])).toBe(oAuthMockScopeData[0]);
        });
    });
});
