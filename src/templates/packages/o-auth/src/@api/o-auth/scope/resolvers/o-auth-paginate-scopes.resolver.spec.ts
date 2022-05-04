/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthPaginateScopesResolver } from './o-auth-paginate-scopes.resolver';
import { OAuthPaginateScopesHandler } from '../handlers/o-auth-paginate-scopes.handler';

// sources
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthPaginateScopesResolver', () =>
{
    let resolver: OAuthPaginateScopesResolver;
    let handler: OAuthPaginateScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthPaginateScopesResolver,
                {
                    provide : OAuthPaginateScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver    = module.get<OAuthPaginateScopesResolver>(OAuthPaginateScopesResolver);
        handler = module.get<OAuthPaginateScopesHandler>(OAuthPaginateScopesHandler);
    });

    test('OAuthPaginateScopesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthPaginateScopesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a scopes', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : scopes,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : scopes,
            });
        });
    });
});