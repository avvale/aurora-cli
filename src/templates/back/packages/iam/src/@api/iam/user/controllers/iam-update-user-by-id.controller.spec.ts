import { IamUpdateUserByIdController, IamUpdateUserByIdHandler } from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateUserByIdController', () =>
{
    let controller: IamUpdateUserByIdController;
    let handler: IamUpdateUserByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateUserByIdController,
            ],
            providers: [
                {
                    provide : IamUpdateUserByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateUserByIdController>(IamUpdateUserByIdController);
        handler = module.get<IamUpdateUserByIdHandler>(IamUpdateUserByIdHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateUserByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a user updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockUserData[0])));
            expect(await controller.main(iamMockUserData[0])).toBe(iamMockUserData[0]);
        });
    });
});
