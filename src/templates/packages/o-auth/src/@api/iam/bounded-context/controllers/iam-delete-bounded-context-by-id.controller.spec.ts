/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteBoundedContextByIdController } from './iam-delete-bounded-context-by-id.controller';
import { IamDeleteBoundedContextByIdHandler } from '../handlers/iam-delete-bounded-context-by-id.handler';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamDeleteBoundedContextByIdController', () =>
{
    let controller: IamDeleteBoundedContextByIdController;
    let handler: IamDeleteBoundedContextByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteBoundedContextByIdController,
            ],
            providers: [
                {
                    provide : IamDeleteBoundedContextByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteBoundedContextByIdController>(IamDeleteBoundedContextByIdController);
        handler = module.get<IamDeleteBoundedContextByIdHandler>(IamDeleteBoundedContextByIdHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteBoundedContextByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an boundedContext deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await controller.main(boundedContexts[0].id)).toBe(boundedContexts[0]);
        });
    });
});