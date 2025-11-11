/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamDeleteAccountByIdController,
    IamDeleteAccountByIdHandler,
} from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteAccountByIdController', () => {
    let controller: IamDeleteAccountByIdController;
    let handler: IamDeleteAccountByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamDeleteAccountByIdController],
            providers: [
                {
                    provide: IamDeleteAccountByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteAccountByIdController>(
            IamDeleteAccountByIdController,
        );
        handler = module.get<IamDeleteAccountByIdHandler>(
            IamDeleteAccountByIdHandler,
        );
    });

    describe('main', () => {
        test('IamDeleteAccountByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an account deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockAccountData[0])),
            );
            expect(await controller.main(iamMockAccountData[0].id)).toBe(
                iamMockAccountData[0],
            );
        });
    });
});
