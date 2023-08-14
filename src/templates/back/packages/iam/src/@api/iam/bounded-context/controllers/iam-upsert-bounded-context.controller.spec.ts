import { IamUpsertBoundedContextController, IamUpsertBoundedContextHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertBoundedContextController', () =>
{
    let controller: IamUpsertBoundedContextController;
    let handler: IamUpsertBoundedContextHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertBoundedContextController,
            ],
            providers: [
                {
                    provide : IamUpsertBoundedContextHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertBoundedContextController>(IamUpsertBoundedContextController);
        handler = module.get<IamUpsertBoundedContextHandler>(IamUpsertBoundedContextHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertBoundedContextController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an boundedContext upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockBoundedContextData[0])));
            expect(await controller.main(iamMockBoundedContextData[0])).toBe(iamMockBoundedContextData[0]);
        });
    });
});
