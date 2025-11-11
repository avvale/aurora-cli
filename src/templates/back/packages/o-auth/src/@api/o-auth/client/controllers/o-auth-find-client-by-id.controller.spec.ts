import {
    OAuthFindClientByIdController,
    OAuthFindClientByIdHandler,
} from '@api/o-auth/client';
import { oAuthMockClientData } from '@app/o-auth/client';
import { Test, TestingModule } from '@nestjs/testing';

describe('OAuthFindClientByIdController', () => {
    let controller: OAuthFindClientByIdController;
    let handler: OAuthFindClientByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [OAuthFindClientByIdController],
            providers: [
                {
                    provide: OAuthFindClientByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<OAuthFindClientByIdController>(
            OAuthFindClientByIdController,
        );
        handler = module.get<OAuthFindClientByIdHandler>(
            OAuthFindClientByIdHandler,
        );
    });

    describe('main', () => {
        test('OAuthFindClientByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an client by id', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(oAuthMockClientData[0])),
            );
            expect(await controller.main(oAuthMockClientData[0].id)).toBe(
                oAuthMockClientData[0],
            );
        });
    });
});
