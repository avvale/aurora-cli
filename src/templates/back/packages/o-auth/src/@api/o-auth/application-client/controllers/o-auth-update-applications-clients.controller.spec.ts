import { OAuthUpdateApplicationsClientsController, OAuthUpdateApplicationsClientsHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationsClientsController', () =>
{
    let controller: OAuthUpdateApplicationsClientsController;
    let handler: OAuthUpdateApplicationsClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthUpdateApplicationsClientsController,
            ],
            providers: [
                {
                    provide : OAuthUpdateApplicationsClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthUpdateApplicationsClientsController>(OAuthUpdateApplicationsClientsController);
        handler = module.get<OAuthUpdateApplicationsClientsHandler>(OAuthUpdateApplicationsClientsHandler);
    });

    describe('main', () =>
    {
        test('OAuthUpdateApplicationsClientsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a applicationsClients updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData[0])));
            expect(await controller.main(oAuthMockApplicationClientData[0])).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});
