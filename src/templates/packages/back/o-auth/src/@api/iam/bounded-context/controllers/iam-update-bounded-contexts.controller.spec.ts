/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateBoundedContextsController } from './iam-update-bounded-contexts.controller';
import { IamUpdateBoundedContextsHandler } from '../handlers/iam-update-bounded-contexts.handler';

// sources
import { boundedContexts } from '@app/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamUpdateBoundedContextsController', () =>
{
    let controller: IamUpdateBoundedContextsController;
    let handler: IamUpdateBoundedContextsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateBoundedContextsController,
            ],
            providers: [
                {
                    provide : IamUpdateBoundedContextsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateBoundedContextsController>(IamUpdateBoundedContextsController);
        handler = module.get<IamUpdateBoundedContextsHandler>(IamUpdateBoundedContextsHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateBoundedContextsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a boundedContexts updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await controller.main(boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});