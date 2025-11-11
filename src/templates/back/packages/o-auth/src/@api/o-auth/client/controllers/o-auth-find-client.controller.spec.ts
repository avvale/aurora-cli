import {
    OAuthFindClientController,
    OAuthFindClientHandler,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindClientController', () => {
    let controller: OAuthFindClientController;
    let handler: OAuthFindClientHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthFindClientController],
            providers: [
                {
                    provide: OAuthFindClientHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthFindClientController>(
            OAuthFindClientController,
        );
        handler = module.get<OAuthFindClientHandler>(OAuthFindClientHandler);
    });

    describe('main', () => {
        test('OAuthFindClientController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a client', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockClientData[0])),
            );
            expect(await controller.main()).toBe(oAuthMockClientData[0]);
        });
    });
});
