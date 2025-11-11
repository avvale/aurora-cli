import {
    IamUpdateRolesAccountsController,
    IamUpdateRolesAccountsHandler,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateRolesAccountsController', () => {
    let controller: IamUpdateRolesAccountsController;
    let handler: IamUpdateRolesAccountsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamUpdateRolesAccountsController],
            providers: [
                {
                    provide: IamUpdateRolesAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdateRolesAccountsController>(
            IamUpdateRolesAccountsController,
        );
        handler = module.get<IamUpdateRolesAccountsHandler>(
            IamUpdateRolesAccountsHandler,
        );
    });

    describe('main', () => {
        test('IamUpdateRolesAccountsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a rolesAccounts updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockRoleAccountData[0]),
                    ),
            );
            expect(await controller.main(iamMockRoleAccountData[0])).toBe(
                iamMockRoleAccountData[0],
            );
        });
    });
});
