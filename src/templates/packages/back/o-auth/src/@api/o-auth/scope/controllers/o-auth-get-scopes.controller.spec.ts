/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthGetScopesController } from './o-auth-get-scopes.controller';
import { OAuthGetScopesHandler } from '../handlers/o-auth-get-scopes.handler';

// sources
import { scopes } from '@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthGetScopesController', () =>
{
    let controller: OAuthGetScopesController;
    let handler: OAuthGetScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthGetScopesController,
            ],
            providers: [
                {
                    provide : OAuthGetScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthGetScopesController>(OAuthGetScopesController);
        handler = module.get<OAuthGetScopesHandler>(OAuthGetScopesHandler);
    });

    describe('main', () =>
    {
        test('OAuthGetScopesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a scopes', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes)));
            expect(await controller.main()).toBe(scopes);
        });
    });
});