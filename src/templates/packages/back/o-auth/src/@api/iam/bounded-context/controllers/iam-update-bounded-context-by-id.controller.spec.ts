/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateBoundedContextByIdController } from './iam-update-bounded-context-by-id.controller';
import { IamUpdateBoundedContextByIdHandler } from '../handlers/iam-update-bounded-context-by-id.handler';

// sources
import { boundedContexts } from '@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamUpdateBoundedContextByIdController', () =>
{
    let controller: IamUpdateBoundedContextByIdController;
    let handler: IamUpdateBoundedContextByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateBoundedContextByIdController,
            ],
            providers: [
                {
                    provide : IamUpdateBoundedContextByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateBoundedContextByIdController>(IamUpdateBoundedContextByIdController);
        handler = module.get<IamUpdateBoundedContextByIdHandler>(IamUpdateBoundedContextByIdHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateBoundedContextByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a boundedContext created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await controller.main(boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});