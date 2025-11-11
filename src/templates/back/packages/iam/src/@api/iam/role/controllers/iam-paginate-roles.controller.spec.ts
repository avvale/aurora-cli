import {
    IamPaginateRolesController,
    IamPaginateRolesHandler,
} from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateRolesController', () => {
    let controller: IamPaginateRolesController;
    let handler: IamPaginateRolesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamPaginateRolesController],
            providers: [
                {
                    provide: IamPaginateRolesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamPaginateRolesController>(
            IamPaginateRolesController,
        );
        handler = module.get<IamPaginateRolesHandler>(IamPaginateRolesHandler);
    });

    describe('main', () => {
        test('IamPaginateRolesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockRoleData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: iamMockRoleData,
                        }),
                    ),
            );
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: iamMockRoleData,
            });
        });
    });
});
