/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteScopesResolver } from './o-auth-delete-scopes.resolver';
import { OAuthDeleteScopesHandler } from '../handlers/o-auth-delete-scopes.handler';

// sources
import { scopes } from '@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthDeleteScopesResolver', () =>
{
    let resolver: OAuthDeleteScopesResolver;
    let handler: OAuthDeleteScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteScopesResolver,
                {
                    provide : OAuthDeleteScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthDeleteScopesResolver>(OAuthDeleteScopesResolver);
        handler = module.get<OAuthDeleteScopesHandler>(OAuthDeleteScopesHandler);
    });

    test('OAuthDeleteScopesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteScopesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an scopes deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes)));
            expect(await resolver.main()).toBe(scopes);
        });
    });
});