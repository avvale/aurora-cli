/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { OAuthPaginateScopesController } from './o-auth-paginate-scopes.controller';
import { OAuthPaginateScopesHandler } from '../handlers/o-auth-paginate-scopes.handler';

// sources
import { scopes } from '@apps/o-auth/scope/infrastructure/seeds/scope.seed';

describe('OAuthPaginateScopesController', () =>
{
    let controller: OAuthPaginateScopesController;
    let handler: OAuthPaginateScopesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthPaginateScopesController,
            ],
            providers: [
                {
                    provide : OAuthPaginateScopesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthPaginateScopesController>(OAuthPaginateScopesController);
        handler = module.get<OAuthPaginateScopesHandler>(OAuthPaginateScopesHandler);
    });

    describe('main', () =>
    {
        test('OAuthPaginateScopesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a scopes', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : scopes,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : scopes,
            });
        });
    });
});