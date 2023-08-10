import { OAuthUpdateClientsController, OAuthUpdateClientsHandler } from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateClientsController', () =>
{
    let controller: OAuthUpdateClientsController;
    let handler: OAuthUpdateClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateClientsController,
            ],
            providers: [
                {
                    provide : OAuthUpdateClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateClientsController>(OAuthUpdateClientsController);
        handler = module.get<OAuthUpdateClientsHandler>(OAuthUpdateClientsHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateClientsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a clients updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockClientData[0])));
            expect(await controller.main(oAuthMockClientData[0])).toBe(oAuthMockClientData[0]);
        });
    });
});
