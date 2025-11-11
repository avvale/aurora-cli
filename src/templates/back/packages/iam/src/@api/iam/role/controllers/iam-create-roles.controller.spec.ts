import { IamCreateRolesController, IamCreateRolesHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRolesController', () => {
    let controller: IamCreateRolesController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [IamCreateRolesController],
            providers: [
                {
                    provide: IamCreateRolesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreateRolesController>(
            IamCreateRolesController,
        );
    });

    describe('main', () => {
        test('IamCreateRolesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an iamMockRoleData created', async () => {
            expect(await controller.main(iamMockRoleData)).toBe(undefined);
        });
    });
});
