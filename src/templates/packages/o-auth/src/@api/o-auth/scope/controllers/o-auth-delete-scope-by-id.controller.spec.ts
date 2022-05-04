/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthDeleteScopeByIdController } from './o-auth-delete-scope-by-id.controller';
import { OAuthDeleteScopeByIdHandler } from '../handlers/o-auth-delete-scope-by-id.handler';

// sources
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthDeleteScopeByIdController', () =>
{
    let controller: OAuthDeleteScopeByIdController;
    let handler: OAuthDeleteScopeByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthDeleteScopeByIdController,
            ],
            providers: [
                {
                    provide : OAuthDeleteScopeByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthDeleteScopeByIdController>(OAuthDeleteScopeByIdController);
        handler = module.get<OAuthDeleteScopeByIdHandler>(OAuthDeleteScopeByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthDeleteScopeByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an scope deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await controller.main(scopes[0].id)).toBe(scopes[0]);
        });
    });
});