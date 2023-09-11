import { OAuthGetApplicationsClientsController, OAuthGetApplicationsClientsHandler } from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetApplicationsClientsController', () =>
{
    let controller: OAuthGetApplicationsClientsController;
    let handler: OAuthGetApplicationsClientsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                OAuthGetApplicationsClientsController,
            ],
            providers: [
                {
                    provide : OAuthGetApplicationsClientsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<OAuthGetApplicationsClientsController>(OAuthGetApplicationsClientsController);
        handler = module.get<OAuthGetApplicationsClientsHandler>(OAuthGetApplicationsClientsHandler);
    });

    describe('main', () =>
    {
        test('OAuthGetApplicationsClientsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a oAuthMockApplicationClientData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(oAuthMockApplicationClientData)));
            expect(await controller.main()).toBe(oAuthMockApplicationClientData);
        });
    });
});
