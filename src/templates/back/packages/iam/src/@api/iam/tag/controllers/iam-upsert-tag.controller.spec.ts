import { IamUpsertTagController, IamUpsertTagHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTagController', () =>
{
    let controller: IamUpsertTagController;
    let handler: IamUpsertTagHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertTagController,
            ],
            providers: [
                {
                    provide : IamUpsertTagHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertTagController>(IamUpsertTagController);
        handler = module.get<IamUpsertTagHandler>(IamUpsertTagHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertTagController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an tag upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTagData[0])));
            expect(await controller.main(iamMockTagData[0])).toBe(iamMockTagData[0]);
        });
    });
});
