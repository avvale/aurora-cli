import {
    IamUpdateBoundedContextByIdController,
    IamUpdateBoundedContextByIdHandler,
} from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateBoundedContextByIdController', () => {
    let controller: IamUpdateBoundedContextByIdController;
    let handler: IamUpdateBoundedContextByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamUpdateBoundedContextByIdController],
            providers: [
                {
                    provide: IamUpdateBoundedContextByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdateBoundedContextByIdController>(
            IamUpdateBoundedContextByIdController,
        );
        handler = module.get<IamUpdateBoundedContextByIdHandler>(
            IamUpdateBoundedContextByIdHandler,
        );
    });

    describe('main', () => {
        test('IamUpdateBoundedContextByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a boundedContext updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockBoundedContextData[0]),
                    ),
            );
            expect(await controller.main(iamMockBoundedContextData[0])).toBe(
                iamMockBoundedContextData[0],
            );
        });
    });
});
