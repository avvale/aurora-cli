/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateScopeByIdResolver } from './o-auth-update-scope-by-id.resolver';
import { OAuthUpdateScopeByIdHandler } from '../handlers/o-auth-update-scope-by-id.handler';
import { OAuthUpdateScopeByIdInput } from '../../../../graphql';

// sources
import { scopes } from '@apps/o-auth/scope/infrastructure/seeds/scope.seed';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await resolver.main(<OAuthUpdateScopeByIdInput>scopes[0])).toBe(scopes[0]);
        });
    });
});