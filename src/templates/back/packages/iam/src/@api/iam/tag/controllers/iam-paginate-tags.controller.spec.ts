import {
    IamPaginateTagsController,
    IamPaginateTagsHandler,
} from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateTagsController', () => {
    let controller: IamPaginateTagsController;
    let handler: IamPaginateTagsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamPaginateTagsController],
            providers: [
                {
                    provide: IamPaginateTagsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamPaginateTagsController>(
            IamPaginateTagsController,
        );
        handler = module.get<IamPaginateTagsHandler>(IamPaginateTagsHandler);
    });

    describe('main', () => {
        test('IamPaginateTagsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockTagData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: iamMockTagData,
                        }),
                    ),
            );
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: iamMockTagData,
            });
        });
    });
});
