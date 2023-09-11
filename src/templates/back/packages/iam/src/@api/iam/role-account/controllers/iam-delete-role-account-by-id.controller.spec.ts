/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteRoleAccountByIdController, IamDeleteRoleAccountByIdHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRoleAccountByIdController', () =>
{
    let controller: IamDeleteRoleAccountByIdController;
    let handler: IamDeleteRoleAccountByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteRoleAccountByIdController,
            ],
            providers: [
                {
                    provide : IamDeleteRoleAccountByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamDeleteRoleAccountByIdController>(IamDeleteRoleAccountByIdController);
        handler = module.get<IamDeleteRoleAccountByIdHandler>(IamDeleteRoleAccountByIdHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteRoleAccountByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an roleAccount deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleAccountData[0])));
            expect(await controller.main(iamMockRoleAccountData[0].id)).toBe(iamMockRoleAccountData[0]);
        });
    });
});
