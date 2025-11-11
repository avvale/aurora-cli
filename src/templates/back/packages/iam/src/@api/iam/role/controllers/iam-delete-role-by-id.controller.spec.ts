/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamDeleteRoleByIdController,
    IamDeleteRoleByIdHandler,
} from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteRoleByIdController', () => {
    let controller: IamDeleteRoleByIdController;
    let handler: IamDeleteRoleByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamDeleteRoleByIdController],
            providers: [
                {
                    provide: IamDeleteRoleByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteRoleByIdController>(
            IamDeleteRoleByIdController,
        );
        handler = module.get<IamDeleteRoleByIdHandler>(
            IamDeleteRoleByIdHandler,
        );
    });

    describe('main', () => {
        test('IamDeleteRoleByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an role deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockRoleData[0])),
            );
            expect(await controller.main(iamMockRoleData[0].id)).toBe(
                iamMockRoleData[0],
            );
        });
    });
});
