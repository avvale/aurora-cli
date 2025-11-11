import { IamGetTagsController, IamGetTagsHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetTagsController', () => {
    let controller: IamGetTagsController;
    let handler: IamGetTagsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamGetTagsController],
            providers: [
                {
                    provide: IamGetTagsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamGetTagsController>(IamGetTagsController);
        handler = module.get<IamGetTagsHandler>(IamGetTagsHandler);
    });

    describe('main', () => {
        test('IamGetTagsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a iamMockTagData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTagData)),
            );
            expect(await controller.main()).toBe(iamMockTagData);
        });
    });
});
