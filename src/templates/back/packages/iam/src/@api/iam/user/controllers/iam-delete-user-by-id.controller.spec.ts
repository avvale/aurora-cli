/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamDeleteUserByIdController,
    IamDeleteUserByIdHandler,
} from '@api/iam/user';
import { iamMockUserData } from '@app/iam/user';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteUserByIdController', () => {
    let controller: IamDeleteUserByIdController;
    let handler: IamDeleteUserByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamDeleteUserByIdController],
            providers: [
                {
                    provide: IamDeleteUserByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteUserByIdController>(
            IamDeleteUserByIdController,
        );
        handler = module.get<IamDeleteUserByIdHandler>(
            IamDeleteUserByIdHandler,
        );
    });

    describe('main', () => {
        test('IamDeleteUserByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an user deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockUserData[0])),
            );
            expect(await controller.main(iamMockUserData[0].id)).toBe(
                iamMockUserData[0],
            );
        });
    });
});
