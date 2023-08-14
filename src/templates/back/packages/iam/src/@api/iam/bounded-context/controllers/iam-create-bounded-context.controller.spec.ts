import { IamCreateBoundedContextController, IamCreateBoundedContextHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateBoundedContextController', () =>
{
    let controller: IamCreateBoundedContextController;
    let handler: IamCreateBoundedContextHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamCreateBoundedContextController,
            ],
            providers: [
                {
                    provide : IamCreateBoundedContextHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamCreateBoundedContextController>(IamCreateBoundedContextController);
        handler = module.get<IamCreateBoundedContextHandler>(IamCreateBoundedContextHandler);
    });

    describe('main', () =>
    {
        test('IamCreateBoundedContextController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an boundedContext created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockBoundedContextData[0])));
            expect(
                await controller.main(
                    iamMockBoundedContextData[0],
                ),
            )
                .toBe(iamMockBoundedContextData[0]);
        });
    });
});
