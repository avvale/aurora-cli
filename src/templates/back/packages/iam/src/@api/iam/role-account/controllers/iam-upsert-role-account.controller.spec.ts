import { IamUpsertRoleAccountController, IamUpsertRoleAccountHandler } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertRoleAccountController', () =>
{
    let controller: IamUpsertRoleAccountController;
    let handler: IamUpsertRoleAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertRoleAccountController,
            ],
            providers: [
                {
                    provide : IamUpsertRoleAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertRoleAccountController>(IamUpsertRoleAccountController);
        handler = module.get<IamUpsertRoleAccountHandler>(IamUpsertRoleAccountHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertRoleAccountController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an roleAccount upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleAccountData[0])));
            expect(await controller.main(iamMockRoleAccountData[0])).toBe(iamMockRoleAccountData[0]);
        });
    });
});
