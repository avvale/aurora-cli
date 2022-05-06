/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteScopesController } from './o-auth-delete-scopes.controller';
import { OAuthDeleteScopesHandler } from '../handlers/o-auth-delete-scopes.handler';

// sources
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthDeleteScopesController', () =>
{
    let controller: OAuthDeleteScopesController;
    let handler: OAuthDeleteScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteScopesController,
            ],
            providers: [
                {
                    provide : OAuthDeleteScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthDeleteScopesController>(OAuthDeleteScopesController);
        handler = module.get<OAuthDeleteScopesHandler>(OAuthDeleteScopesHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteScopesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an scopes deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes)));
            expect(await controller.main()).toBe(scopes);
        });
    });
});