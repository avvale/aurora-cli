import { IamDeleteTagsController, IamDeleteTagsHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTagsController', () =>
{
    let controller: IamDeleteTagsController;
    let handler: IamDeleteTagsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteTagsController,
            ],
            providers: [
                {
                    provide : IamDeleteTagsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamDeleteTagsController>(IamDeleteTagsController);
        handler = module.get<IamDeleteTagsHandler>(IamDeleteTagsHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteTagsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an iamMockTagData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData)));
            expect(await controller.main()).toBe(iamMockTagData);
        });
    });
});
