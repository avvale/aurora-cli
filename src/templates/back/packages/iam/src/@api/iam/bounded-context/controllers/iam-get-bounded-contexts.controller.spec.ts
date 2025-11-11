import {
    IamGetBoundedContextsController,
    IamGetBoundedContextsHandler,
} from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetBoundedContextsController', () => {
    let controller: IamGetBoundedContextsController;
    let handler: IamGetBoundedContextsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamGetBoundedContextsController],
            providers: [
                {
                    provide: IamGetBoundedContextsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamGetBoundedContextsController>(
            IamGetBoundedContextsController,
        );
        handler = module.get<IamGetBoundedContextsHandler>(
            IamGetBoundedContextsHandler,
        );
    });

    describe('main', () => {
        test('IamGetBoundedContextsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockBoundedContextData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockBoundedContextData),
                    ),
            );
            expect(await controller.main()).toBe(iamMockBoundedContextData);
        });
    });
});
