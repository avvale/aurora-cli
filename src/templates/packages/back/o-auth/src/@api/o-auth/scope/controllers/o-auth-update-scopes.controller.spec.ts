/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateScopesController } from './o-auth-update-scopes.controller';
import { OAuthUpdateScopesHandler } from '../handlers/o-auth-update-scopes.handler';

// sources
import { scopes } from '@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthUpdateScopesController', () =>
{
    let controller: OAuthUpdateScopesController;
    let handler: OAuthUpdateScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateScopesController,
            ],
            providers: [
                {
                    provide : OAuthUpdateScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateScopesController>(OAuthUpdateScopesController);
        handler = module.get<OAuthUpdateScopesHandler>(OAuthUpdateScopesHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a scopes updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await controller.main(scopes[0])).toBe(scopes[0]);
        });
    });
});