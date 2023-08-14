import { OAuthPaginateClientsController, OAuthPaginateClientsHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthPaginateClientsController', () =>
{
    let controller: OAuthPaginateClientsController;
    let handler: OAuthPaginateClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthPaginateClientsController,
            ],
            providers: [
                {
                    provide : OAuthPaginateClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthPaginateClientsController>(OAuthPaginateClientsController);
        handler = module.get<OAuthPaginateClientsHandler>(OAuthPaginateClientsHandler);
    });

    describe('main', () =>
    {
        test('OAuthPaginateClientsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a oAuthMockClientData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : oAuthMockClientData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : oAuthMockClientData,
            });
        });
    });
});
