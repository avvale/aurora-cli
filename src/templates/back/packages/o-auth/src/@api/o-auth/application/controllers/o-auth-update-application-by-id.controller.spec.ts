import {
    OAuthUpdateApplicationByIdController,
    OAuthUpdateApplicationByIdHandler,
} from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthUpdateApplicationByIdController', () => {
    let controller: OAuthUpdateApplicationByIdController;
    let handler: OAuthUpdateApplicationByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthUpdateApplicationByIdController],
            providers: [
                {
                    provide: OAuthUpdateApplicationByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthUpdateApplicationByIdController>(
            OAuthUpdateApplicationByIdController,
        );
        handler = module.get<OAuthUpdateApplicationByIdHandler>(
            OAuthUpdateApplicationByIdHandler,
        );
    });

    describe('main', () => {
        test('OAuthUpdateApplicationByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a application updated', async () => {
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
