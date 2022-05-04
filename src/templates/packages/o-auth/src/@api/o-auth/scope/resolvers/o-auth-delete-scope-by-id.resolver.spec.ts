/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteScopeByIdResolver } from './o-auth-delete-scope-by-id.resolver';
import { OAuthDeleteScopeByIdHandler } from '../handlers/o-auth-delete-scope-by-id.handler';

// sources
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthDeleteScopeByIdResolver', () =>
{
    let resolver: OAuthDeleteScopeByIdResolver;
    let handler: OAuthDeleteScopeByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthDeleteScopeByIdResolver,
                {
                    provide : OAuthDeleteScopeByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthDeleteScopeByIdResolver>(OAuthDeleteScopeByIdResolver);
        handler = module.get<OAuthDeleteScopeByIdHandler>(OAuthDeleteScopeByIdHandler);
    });

    test('OAuthDeleteScopeByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthDeleteScopeByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an scope deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await resolver.main(scopes[0].id)).toBe(scopes[0]);
        });
    });
});