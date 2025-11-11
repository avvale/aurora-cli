/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    OAuthDeleteApplicationByIdController,
    OAuthDeleteApplicationByIdHandler,
} from '@api/o-auth/application';
import { oAuthMockApplicationData } from '@app/o-auth/application';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthDeleteApplicationByIdController', () => {
    let controller: OAuthDeleteApplicationByIdController;
    let handler: OAuthDeleteApplicationByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthDeleteApplicationByIdController],
            providers: [
                {
                    provide: OAuthDeleteApplicationByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthDeleteApplicationByIdController>(
            OAuthDeleteApplicationByIdController,
        );
        handler = module.get<OAuthDeleteApplicationByIdHandler>(
            OAuthDeleteApplicationByIdHandler,
        );
    });

    describe('main', () => {
        test('OAuthDeleteApplicationByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an application deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(oAuthMockApplicationData[0]),
                    ),
            );
            expect(await controller.main(oAuthMockApplicationData[0].id)).toBe(
                oAuthMockApplicationData[0],
            );
        });
    });
});
