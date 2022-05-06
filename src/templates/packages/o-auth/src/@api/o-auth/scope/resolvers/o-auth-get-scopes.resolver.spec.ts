/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetScopesResolver } from './o-auth-get-scopes.resolver';
import { OAuthGetScopesHandler } from '../handlers/o-auth-get-scopes.handler';

// sources
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthGetScopesResolver', () =>
{
    let resolver: OAuthGetScopesResolver;
    let handler: OAuthGetScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthGetScopesResolver,
                {
                    provide : OAuthGetScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthGetScopesResolver>(OAuthGetScopesResolver);
        handler = module.get<OAuthGetScopesHandler>(OAuthGetScopesHandler);
    });

    test('OAuthGetScopesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthGetScopesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a scopes', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes)));
            expect(await resolver.main()).toBe(scopes);
        });
    });
});