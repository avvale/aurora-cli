import { IamUpsertPermissionRoleController, IamUpsertPermissionRoleHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertPermissionRoleController', () =>
{
    let controller: IamUpsertPermissionRoleController;
    let handler: IamUpsertPermissionRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertPermissionRoleController,
            ],
            providers: [
                {
                    provide : IamUpsertPermissionRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertPermissionRoleController>(IamUpsertPermissionRoleController);
        handler = module.get<IamUpsertPermissionRoleHandler>(IamUpsertPermissionRoleHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertPermissionRoleController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an permissionRole upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData[0])));
            expect(await controller.main(iamMockPermissionRoleData[0])).toBe(iamMockPermissionRoleData[0]);
        });
    });
});
