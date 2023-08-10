/* eslint-disable @typescript-eslint/no-unused-vars */
import { OAuthUpdateScopeByIdInput } from '@api/graphql';
import { OAuthUpdateScopeByIdHandler, OAuthUpdateScopeByIdResolver } from '@api/o-auth/scope';
import { oAuthMockScopeData } from '@app/o-auth/scope';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateScopeByIdResolver', () =>
{
    let resolver: OAuthUpdateScopeByIdResolver;
    let handler: OAuthUpdateScopeByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateScopeByIdResolver,
                {
                    provide : OAuthUpdateScopeByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthUpdateScopeByIdResolver>(OAuthUpdateScopeByIdResolver);
        handler = module.get<OAuthUpdateScopeByIdHandler>(OAuthUpdateScopeByIdHandler);
    });

    test('OAuthUpdateScopeByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopeByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a scope by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockScopeData[0])));
            expect(await resolver.main(<OAuthUpdateScopeByIdInput>oAuthMockScopeData[0])).toBe(oAuthMockScopeData[0]);
        });
    });
});
