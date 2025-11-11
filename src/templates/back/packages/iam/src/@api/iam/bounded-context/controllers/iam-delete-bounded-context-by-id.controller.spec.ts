/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IamDeleteBoundedContextByIdController,
    IamDeleteBoundedContextByIdHandler,
} from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteBoundedContextByIdController', () => {
    let controller: IamDeleteBoundedContextByIdController;
    let handler: IamDeleteBoundedContextByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamDeleteBoundedContextByIdController],
            providers: [
                {
                    provide: IamDeleteBoundedContextByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteBoundedContextByIdController>(
            IamDeleteBoundedContextByIdController,
        );
        handler = module.get<IamDeleteBoundedContextByIdHandler>(
            IamDeleteBoundedContextByIdHandler,
        );
    });

    describe('main', () => {
        test('IamDeleteBoundedContextByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an boundedContext deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockBoundedContextData[0]),
                    ),
            );
            expect(await controller.main(iamMockBoundedContextData[0].id)).toBe(
                iamMockBoundedContextData[0],
            );
        });
    });
});
