import {
    OAuthDeleteClientsController,
    OAuthDeleteClientsHandler,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteClientsController', () => {
    let controller: OAuthDeleteClientsController;
    let handler: OAuthDeleteClientsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthDeleteClientsController],
            providers: [
                {
                    provide: OAuthDeleteClientsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthDeleteClientsController>(
            OAuthDeleteClientsController,
        );
        handler = module.get<OAuthDeleteClientsHandler>(
            OAuthDeleteClientsHandler,
        );
    });

    describe('main', () => {
        test('OAuthDeleteClientsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an oAuthMockClientData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockClientData)),
            );
            expect(await controller.main()).toBe(oAuthMockClientData);
        });
    });
});
