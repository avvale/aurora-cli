/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateScopeByIdInput } from '@api/graphql';
import { OAuthUpsertScopeHandler, OAuthUpsertScopeResolver } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpsertScopeResolver', () =>
{
    let resolver: OAuthUpsertScopeResolver;
    let handler: OAuthUpsertScopeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpsertScopeResolver,
                {
                    provide : OAuthUpsertScopeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpsertScopeResolver>(OAuthUpsertScopeResolver);
        handler = module.get<OAuthUpsertScopeHandler>(OAuthUpsertScopeHandler);
    });

    test('OAuthUpsertScopeResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpsertScopeResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an scope upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData[0])));
            expect(await resolver.main(<OAuthUpdateScopeByIdInput>oAuthMockScopeData[0])).toBe(oAuthMockScopeData[0]);
        });
    });
});
