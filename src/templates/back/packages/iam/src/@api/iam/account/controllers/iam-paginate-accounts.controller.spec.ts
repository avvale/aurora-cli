import {
    IamPaginateAccountsController,
    IamPaginateAccountsHandler,
} from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateAccountsController', () => {
    let controller: IamPaginateAccountsController;
    let handler: IamPaginateAccountsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamPaginateAccountsController],
            providers: [
                {
                    provide: IamPaginateAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamPaginateAccountsController>(
            IamPaginateAccountsController,
        );
        handler = module.get<IamPaginateAccountsHandler>(
            IamPaginateAccountsHandler,
        );
    });

    describe('main', () => {
        test('IamPaginateAccountsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockAccountData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: iamMockAccountData,
                        }),
                    ),
            );
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: iamMockAccountData,
            });
        });
    });
});
