import {
    OAuthCreateApplicationsClientsController,
    OAuthCreateApplicationsClientsHandler,
} from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationsClientsController', () => {
    let controller: OAuthCreateApplicationsClientsController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OAuthCreateApplicationsClientsController],
            providers: [
                {
                    provide: OAuthCreateApplicationsClientsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthCreateApplicationsClientsController>(
            OAuthCreateApplicationsClientsController,
        );
    });

    describe('main', () => {
        test('OAuthCreateApplicationsClientsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an oAuthMockApplicationClientData created', async () => {
            expect(await controller.main(oAuthMockApplicationClientData)).toBe(
                undefined,
            );
        });
    });
});
