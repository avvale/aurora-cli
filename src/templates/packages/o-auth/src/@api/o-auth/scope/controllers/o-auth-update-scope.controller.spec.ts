/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateScopeController } from './o-auth-update-scope.controller';
import { OAuthUpdateScopeHandler } from '../handlers/o-auth-update-scope.handler';

// sources
import { scopes } from '@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthUpdateScopeController', () =>
{
    let controller: OAuthUpdateScopeController;
    let handler: OAuthUpdateScopeHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateScopeController,
            ],
            providers: [
                {
                    provide : OAuthUpdateScopeHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateScopeController>(OAuthUpdateScopeController);
        handler = module.get<OAuthUpdateScopeHandler>(OAuthUpdateScopeHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopeController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a scope created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await controller.main(scopes[0])).toBe(scopes[0]);
        });
    });
});