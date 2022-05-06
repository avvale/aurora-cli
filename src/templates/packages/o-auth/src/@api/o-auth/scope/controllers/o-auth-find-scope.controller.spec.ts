/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindScopeController } from './o-auth-find-scope.controller';
import { OAuthFindScopeHandler } from '../handlers/o-auth-find-scope.handler';

// sources
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthFindScopeController', () =>
{
    let controller: OAuthFindScopeController;
    let handler: OAuthFindScopeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindScopeController,
            ],
            providers: [
                {
                    provide : OAuthFindScopeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindScopeController>(OAuthFindScopeController);
        handler = module.get<OAuthFindScopeHandler>(OAuthFindScopeHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindScopeController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a scope', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await controller.main()).toBe(scopes[0]);
        });
    });
});