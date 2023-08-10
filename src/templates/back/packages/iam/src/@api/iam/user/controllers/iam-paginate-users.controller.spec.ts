import { IamPaginateUsersController, IamPaginateUsersHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateUsersController', () =>
{
    let controller: IamPaginateUsersController;
    let handler: IamPaginateUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamPaginateUsersController,
            ],
            providers: [
                {
                    provide : IamPaginateUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamPaginateUsersController>(IamPaginateUsersController);
        handler = module.get<IamPaginateUsersHandler>(IamPaginateUsersHandler);
    });

    describe('main', () =>
    {
        test('IamPaginateUsersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockUserData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : iamMockUserData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : iamMockUserData,
            });
        });
    });
});
