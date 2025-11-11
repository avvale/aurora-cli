import {
    IamPaginateRolesAccountsController,
    IamPaginateRolesAccountsHandler,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateRolesAccountsController', () => {
    let controller: IamPaginateRolesAccountsController;
    let handler: IamPaginateRolesAccountsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamPaginateRolesAccountsController],
            providers: [
                {
                    provide: IamPaginateRolesAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamPaginateRolesAccountsController>(
            IamPaginateRolesAccountsController,
        );
        handler = module.get<IamPaginateRolesAccountsHandler>(
            IamPaginateRolesAccountsHandler,
        );
    });

    describe('main', () => {
        test('IamPaginateRolesAccountsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockRoleAccountData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: iamMockRoleAccountData,
                        }),
                    ),
            );
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: iamMockRoleAccountData,
            });
        });
    });
});
