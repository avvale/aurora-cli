import {
    OAuthCreateApplicationClientController,
    OAuthCreateApplicationClientHandler,
} from '@api/o-auth/application-client';
import { oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationClientController', () => {
    let controller: OAuthCreateApplicationClientController;
    let handler: OAuthCreateApplicationClientHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthCreateApplicationClientController],
            providers: [
                {
                    provide: OAuthCreateApplicationClientHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthCreateApplicationClientController>(
            OAuthCreateApplicationClientController,
        );
        handler = module.get<OAuthCreateApplicationClientHandler>(
            OAuthCreateApplicationClientHandler,
        );
    });

    describe('main', () => {
        test('OAuthCreateApplicationClientController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an applicationClient created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockApplicationClientData[0]),
                    ),
            );
            expect(
                await controller.main(oAuthMockApplicationClientData[0]),
            ).toBe(oAuthMockApplicationClientData[0]);
        });
    });
});
