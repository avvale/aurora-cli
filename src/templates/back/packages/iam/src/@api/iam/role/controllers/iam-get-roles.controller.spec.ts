import { IamGetRolesController, IamGetRolesHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetRolesController', () =>
{
    let controller: IamGetRolesController;
    let handler: IamGetRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamGetRolesController,
            ],
            providers: [
                {
                    provide : IamGetRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamGetRolesController>(IamGetRolesController);
        handler = module.get<IamGetRolesHandler>(IamGetRolesHandler);
    });

    describe('main', () =>
    {
        test('IamGetRolesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockRoleData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleData)));
            expect(await controller.main()).toBe(iamMockRoleData);
        });
    });
});
