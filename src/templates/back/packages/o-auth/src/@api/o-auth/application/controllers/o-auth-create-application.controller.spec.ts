import {
    OAuthCreateApplicationController,
    OAuthCreateApplicationHandler,
} from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthCreateApplicationController', () => {
    let controller: OAuthCreateApplicationController;
    let handler: OAuthCreateApplicationHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthCreateApplicationController],
            providers: [
                {
                    provide: OAuthCreateApplicationHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthCreateApplicationController>(
            OAuthCreateApplicationController,
        );
        handler = module.get<OAuthCreateApplicationHandler>(
            OAuthCreateApplicationHandler,
        );
    });

    describe('main', () => {
        test('OAuthCreateApplicationController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an application created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockApplicationData[0]),
                    ),
            );
            expect(await controller.main(oAuthMockApplicationData[0])).toBe(
                oAuthMockApplicationData[0],
            );
        });
    });
});
