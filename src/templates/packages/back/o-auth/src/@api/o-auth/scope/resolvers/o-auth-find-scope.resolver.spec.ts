/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindScopeResolver } from './o-auth-find-scope.resolver';
import { OAuthFindScopeHandler } from '../handlers/o-auth-find-scope.handler';

// sources
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthFindScopeResolver', () =>
{
    let resolver: OAuthFindScopeResolver;
    let handler: OAuthFindScopeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindScopeResolver,
                {
                    provide : OAuthFindScopeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindScopeResolver>(OAuthFindScopeResolver);
        handler = module.get<OAuthFindScopeHandler>(OAuthFindScopeHandler);
    });

    test('OAuthFindScopeResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindScopeResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a scope', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await resolver.main()).toBe(scopes[0]);
        });
    });
});