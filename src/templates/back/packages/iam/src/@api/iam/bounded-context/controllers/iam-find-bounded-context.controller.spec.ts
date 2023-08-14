import { IamFindBoundedContextController, IamFindBoundedContextHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindBoundedContextController', () =>
{
    let controller: IamFindBoundedContextController;
    let handler: IamFindBoundedContextHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindBoundedContextController,
            ],
            providers: [
                {
                    provide : IamFindBoundedContextHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamFindBoundedContextController>(IamFindBoundedContextController);
        handler = module.get<IamFindBoundedContextHandler>(IamFindBoundedContextHandler);
    });

    describe('main', () =>
    {
        test('IamFindBoundedContextController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a boundedContext', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockBoundedContextData[0])));
            expect(await controller.main()).toBe(iamMockBoundedContextData[0]);
        });
    });
});
