import {
    OAuthGetClientsController,
    OAuthGetClientsHandler,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthGetClientsController', () => {
    let controller: OAuthGetClientsController;
    let handler: OAuthGetClientsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthGetClientsController],
            providers: [
                {
                    provide: OAuthGetClientsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthGetClientsController>(
            OAuthGetClientsController,
        );
        handler = module.get<OAuthGetClientsHandler>(OAuthGetClientsHandler);
    });

    describe('main', () => {
        test('OAuthGetClientsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a oAuthMockClientData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockClientData)),
            );
            expect(await controller.main()).toBe(oAuthMockClientData);
        });
    });
});
