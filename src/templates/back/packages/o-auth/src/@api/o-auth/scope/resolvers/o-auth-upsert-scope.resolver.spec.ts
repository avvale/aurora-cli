/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpsertScopeResolver } from './o-auth-upsert-scope.resolver';
import { OAuthUpsertScopeHandler } from '../handlers/o-auth-upsert-scope.handler';
import { OAuthUpsertScopeInput } from '@api/graphql';

// sources
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await resolver.main(<OAuthUpsertScopeInput>scopes[0])).toBe(scopes[0]);
        });
    });
});