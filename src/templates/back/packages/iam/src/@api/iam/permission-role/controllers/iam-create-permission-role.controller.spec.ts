import { IamCreatePermissionRoleController, IamCreatePermissionRoleHandler } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionRoleController', () =>
{
    let controller: IamCreatePermissionRoleController;
    let handler: IamCreatePermissionRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamCreatePermissionRoleController,
            ],
            providers: [
                {
                    provide : IamCreatePermissionRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamCreatePermissionRoleController>(IamCreatePermissionRoleController);
        handler = module.get<IamCreatePermissionRoleHandler>(IamCreatePermissionRoleHandler);
    });

    describe('main', () =>
    {
        test('IamCreatePermissionRoleController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an permissionRole created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData[0])));
            expect(
                await controller.main(
                    iamMockPermissionRoleData[0],
                ),
            )
                .toBe(iamMockPermissionRoleData[0]);
        });
    });
});
