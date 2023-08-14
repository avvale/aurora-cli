import { IamFindBoundedContextByIdController, IamFindBoundedContextByIdHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindBoundedContextByIdController', () =>
{
    let controller: IamFindBoundedContextByIdController;
    let handler: IamFindBoundedContextByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindBoundedContextByIdController,
            ],
            providers: [
                {
                    provide : IamFindBoundedContextByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamFindBoundedContextByIdController>(IamFindBoundedContextByIdController);
        handler = module.get<IamFindBoundedContextByIdHandler>(IamFindBoundedContextByIdHandler);
    });

    describe('main', () =>
    {
        test('IamFindBoundedContextByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an boundedContext by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockBoundedContextData[0])));
            expect(await controller.main(iamMockBoundedContextData[0].id)).toBe(iamMockBoundedContextData[0]);
        });
    });
});
