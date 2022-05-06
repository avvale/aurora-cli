/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthFindScopeByIdController } from './o-auth-find-scope-by-id.controller';
import { OAuthFindScopeByIdHandler } from '../handlers/o-auth-find-scope-by-id.handler';

// sources
import { scopes } from '@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthFindScopeByIdController', () =>
{
    let controller: OAuthFindScopeByIdController;
    let handler: OAuthFindScopeByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthFindScopeByIdController,
            ],
            providers: [
                {
                    provide : OAuthFindScopeByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthFindScopeByIdController>(OAuthFindScopeByIdController);
        handler = module.get<OAuthFindScopeByIdHandler>(OAuthFindScopeByIdHandler);
    });

    describe('main', () =>
    {
        test('OAuthFindScopeByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an scope by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(scopes[0])));
            expect(await controller.main(scopes[0].id)).toBe(scopes[0]);
        });
    });
});