import { IamGetUsersController, IamGetUsersHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetUsersController', () => {
    let controller: IamGetUsersController;
    let handler: IamGetUsersHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamGetUsersController],
            providers: [
                {
                    provide: IamGetUsersHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamGetUsersController>(IamGetUsersController);
        handler = module.get<IamGetUsersHandler>(IamGetUsersHandler);
    });

    describe('main', () => {
        test('IamGetUsersController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockUserData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockUserData)),
            );
            expect(await controller.main()).toBe(iamMockUserData);
        });
    });
});
