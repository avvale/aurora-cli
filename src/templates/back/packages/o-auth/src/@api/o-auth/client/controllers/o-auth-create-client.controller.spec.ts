import {
    OAuthCreateClientController,
    OAuthCreateClientHandler,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateClientController', () => {
    let controller: OAuthCreateClientController;
    let handler: OAuthCreateClientHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthCreateClientController],
            providers: [
                {
                    provide: OAuthCreateClientHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthCreateClientController>(
            OAuthCreateClientController,
        );
        handler = module.get<OAuthCreateClientHandler>(
            OAuthCreateClientHandler,
        );
    });

    describe('main', () => {
        test('OAuthCreateClientController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an client created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockClientData[0])),
            );
            expect(await controller.main(oAuthMockClientData[0])).toBe(
                oAuthMockClientData[0],
            );
        });
    });
});
