import { IamUpdateRolesController, IamUpdateRolesHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRolesController', () =>
{
    let controller: IamUpdateRolesController;
    let handler: IamUpdateRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateRolesController,
            ],
            providers: [
                {
                    provide : IamUpdateRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateRolesController>(IamUpdateRolesController);
        handler = module.get<IamUpdateRolesHandler>(IamUpdateRolesHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateRolesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a roles updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleData[0])));
            expect(await controller.main(iamMockRoleData[0])).toBe(iamMockRoleData[0]);
        });
    });
});
