import { IamCreateBoundedContextsController, IamCreateBoundedContextsHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateBoundedContextsController', () =>
{
    let controller: IamCreateBoundedContextsController;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreateBoundedContextsController,
            ],
            providers: [
                {
                    provide : IamCreateBoundedContextsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamCreateBoundedContextsController>(IamCreateBoundedContextsController);
    });

    describe('main', () =>
    {
        test('IamCreateBoundedContextsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an iamMockBoundedContextData created', async () =>
        {
            expect(
                await controller.main(
                    iamMockBoundedContextData,
                ),
            )
                .toBe(undefined);
        });
    });
});
