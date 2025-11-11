import {
    IamUpdateAccountsController,
    IamUpdateAccountsHandler,
} from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateAccountsController', () => {
    let controller: IamUpdateAccountsController;
    let handler: IamUpdateAccountsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamUpdateAccountsController],
            providers: [
                {
                    provide: IamUpdateAccountsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdateAccountsController>(
            IamUpdateAccountsController,
        );
        handler = module.get<IamUpdateAccountsHandler>(
            IamUpdateAccountsHandler,
        );
    });

    describe('main', () => {
        test('IamUpdateAccountsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a accounts updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockAccountData[0])),
            );
            expect(await controller.main(iamMockAccountData[0])).toBe(
                iamMockAccountData[0],
            );
        });
    });
});
