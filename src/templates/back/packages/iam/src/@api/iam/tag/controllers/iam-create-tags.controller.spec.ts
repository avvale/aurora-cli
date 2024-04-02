import { IamCreateTagsController, IamCreateTagsHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTagsController', () =>
{
    let controller: IamCreateTagsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreateTagsController,
            ],
            providers: [
                {
                    provide : IamCreateTagsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamCreateTagsController>(IamCreateTagsController);
    });

    describe('main', () =>
    {
        test('IamCreateTagsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an iamMockTagData created', async () =>
        {
            expect(
                await controller.main(
                    iamMockTagData,
                ),
            )
                .toBe(undefined);
        });
    });
});
