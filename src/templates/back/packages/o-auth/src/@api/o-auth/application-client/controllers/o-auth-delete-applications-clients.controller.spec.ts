import {
    OAuthDeleteApplicationsClientsController,
    OAuthDeleteApplicationsClientsHandler,
} from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationsClientsController', () => {
    let controller: OAuthDeleteApplicationsClientsController;
    let handler: OAuthDeleteApplicationsClientsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthDeleteApplicationsClientsController],
            providers: [
                {
                    provide: OAuthDeleteApplicationsClientsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthDeleteApplicationsClientsController>(
            OAuthDeleteApplicationsClientsController,
        );
        handler = module.get<OAuthDeleteApplicationsClientsHandler>(
            OAuthDeleteApplicationsClientsHandler,
        );
    });

    describe('main', () => {
        test('OAuthDeleteApplicationsClientsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an oAuthMockApplicationClientData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockApplicationClientData),
                    ),
            );
            expect(await controller.main()).toBe(
                oAuthMockApplicationClientData,
            );
        });
    });
});
