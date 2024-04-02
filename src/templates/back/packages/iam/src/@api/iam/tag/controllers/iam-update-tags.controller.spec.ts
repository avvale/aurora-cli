import { IamUpdateTagsController, IamUpdateTagsHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTagsController', () =>
{
    let controller: IamUpdateTagsController;
    let handler: IamUpdateTagsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateTagsController,
            ],
            providers: [
                {
                    provide : IamUpdateTagsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateTagsController>(IamUpdateTagsController);
        handler = module.get<IamUpdateTagsHandler>(IamUpdateTagsHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateTagsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a tags updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData[0])));
            expect(await controller.main(iamMockTagData[0])).toBe(iamMockTagData[0]);
        });
    });
});
