import { IamFindUserByIdController, IamFindUserByIdHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindUserByIdController', () =>
{
    let controller: IamFindUserByIdController;
    let handler: IamFindUserByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindUserByIdController,
            ],
            providers: [
                {
                    provide : IamFindUserByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamFindUserByIdController>(IamFindUserByIdController);
        handler = module.get<IamFindUserByIdHandler>(IamFindUserByIdHandler);
    });

    describe('main', () =>
    {
        test('IamFindUserByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an user by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockUserData[0])));
            expect(await controller.main(iamMockUserData[0].id)).toBe(iamMockUserData[0]);
        });
    });
});
