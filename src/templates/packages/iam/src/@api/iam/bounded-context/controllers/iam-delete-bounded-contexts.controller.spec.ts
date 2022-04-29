/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteBoundedContextsController } from './iam-delete-bounded-contexts.controller';
import { IamDeleteBoundedContextsHandler } from '../handlers/iam-delete-bounded-contexts.handler';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamDeleteBoundedContextsController', () =>
{
    let controller: IamDeleteBoundedContextsController;
    let handler: IamDeleteBoundedContextsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteBoundedContextsController,
            ],
            providers: [
                {
                    provide : IamDeleteBoundedContextsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteBoundedContextsController>(IamDeleteBoundedContextsController);
        handler = module.get<IamDeleteBoundedContextsHandler>(IamDeleteBoundedContextsHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteBoundedContextsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an boundedContexts deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts)));
            expect(await controller.main()).toBe(boundedContexts);
        });
    });
});