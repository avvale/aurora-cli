/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateScopeResolver } from './o-auth-update-scope.resolver';
import { OAuthUpdateScopeHandler } from '../handlers/o-auth-update-scope.handler';
import { OAuthUpdateScopeInput } from '../../../../graphql';

// sources
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthUpdateScopeResolver', () =>
{
    let resolver: OAuthUpdateScopeResolver;
    let handler: OAuthUpdateScopeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthUpdateScopeResolver,
                {
                    provide : OAuthUpdateScopeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<OAuthUpdateScopeResolver>(OAuthUpdateScopeResolver);
        handler = module.get<OAuthUpdateScopeHandler>(OAuthUpdateScopeHandler);
    });

    test('OAuthUpdateScopeResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopeResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a scope created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await resolver.main(<OAuthUpdateScopeInput>scopes[0])).toBe(scopes[0]);
        });
    });
});