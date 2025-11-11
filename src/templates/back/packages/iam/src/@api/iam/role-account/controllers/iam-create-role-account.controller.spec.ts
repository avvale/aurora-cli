import {
    IamCreateRoleAccountController,
    IamCreateRoleAccountHandler,
} from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRoleAccountController', () => {
    let controller: IamCreateRoleAccountController;
    let handler: IamCreateRoleAccountHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamCreateRoleAccountController],
            providers: [
                {
                    provide: IamCreateRoleAccountHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreateRoleAccountController>(
            IamCreateRoleAccountController,
        );
        handler = module.get<IamCreateRoleAccountHandler>(
            IamCreateRoleAccountHandler,
        );
    });

    describe('main', () => {
        test('IamCreateRoleAccountController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an roleAccount created', async () => {
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
