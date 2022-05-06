/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindScopeByIdResolver } from './o-auth-find-scope-by-id.resolver';
import { OAuthFindScopeByIdHandler } from '../handlers/o-auth-find-scope-by-id.handler';

// sources
import { scopes } from '@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthFindScopeByIdResolver', () =>
{
    let resolver: OAuthFindScopeByIdResolver;
    let handler: OAuthFindScopeByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthFindScopeByIdResolver,
                {
                    provide : OAuthFindScopeByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthFindScopeByIdResolver>(OAuthFindScopeByIdResolver);
        handler = module.get<OAuthFindScopeByIdHandler>(OAuthFindScopeByIdHandler);
    });

    test('OAuthFindScopeByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthFindScopeByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an scope by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await resolver.main(scopes[0].id)).toBe(scopes[0]);
        });
    });
});