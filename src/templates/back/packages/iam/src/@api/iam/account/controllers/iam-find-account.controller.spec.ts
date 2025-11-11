import {
    IamFindAccountController,
    IamFindAccountHandler,
} from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindAccountController', () => {
    let controller: IamFindAccountController;
    let handler: IamFindAccountHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamFindAccountController],
            providers: [
                {
                    provide: IamFindAccountHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindAccountController>(
            IamFindAccountController,
        );
        handler = module.get<IamFindAccountHandler>(IamFindAccountHandler);
    });

    describe('main', () => {
        test('IamFindAccountController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a account', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockAccountData[0])),
            );
            expect(await controller.main()).toBe(iamMockAccountData[0]);
        });
    });
});
