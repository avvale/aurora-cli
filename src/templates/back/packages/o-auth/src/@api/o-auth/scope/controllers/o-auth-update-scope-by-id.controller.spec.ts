/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthUpdateScopeByIdController } from './o-auth-update-scope-by-id.controller';
import { OAuthUpdateScopeByIdHandler } from '../handlers/o-auth-update-scope-by-id.handler';

// sources
import { scopes } from '@app/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthUpdateScopeByIdController', () =>
{
    let controller: OAuthUpdateScopeByIdController;
    let handler: OAuthUpdateScopeByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateScopeByIdController,
            ],
            providers: [
                {
                    provide : OAuthUpdateScopeByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateScopeByIdController>(OAuthUpdateScopeByIdController);
        handler = module.get<OAuthUpdateScopeByIdHandler>(OAuthUpdateScopeByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateScopeByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a scope updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await controller.main(scopes[0])).toBe(scopes[0]);
        });
    });
});