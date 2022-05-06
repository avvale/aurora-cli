/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthCreateScopeResolver } from './o-auth-create-scope.resolver';
import { OAuthCreateScopeHandler } from '../handlers/o-auth-create-scope.handler';
import { OAuthCreateScopeInput } from '../../../../../graphql';

// sources
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthCreateScopeResolver', () =>
{
    let resolver: OAuthCreateScopeResolver;
    let handler: OAuthCreateScopeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                OAuthCreateScopeResolver,
                {
                    provide : OAuthCreateScopeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<OAuthCreateScopeResolver>(OAuthCreateScopeResolver);
        handler = module.get<OAuthCreateScopeHandler>(OAuthCreateScopeHandler);
    });

    test('OAuthCreateScopeResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('OAuthCreateScopeResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an scope created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await resolver.main(<OAuthCreateScopeInput>scopes[0])).toBe(scopes[0]);
        });
    });
});