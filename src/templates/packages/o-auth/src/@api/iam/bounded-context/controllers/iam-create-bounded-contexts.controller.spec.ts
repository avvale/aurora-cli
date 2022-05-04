import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateBoundedContextsController } from './iam-create-bounded-contexts.controller';
import { IamCreateBoundedContextsHandler } from '../handlers/iam-create-bounded-contexts.handler';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamCreateBoundedContextsController', () =>
{
    let controller: IamCreateBoundedContextsController;
    let handler: IamCreateBoundedContextsHandler;

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
        }).compile();

        controller = module.get<IamCreateBoundedContextsController>(IamCreateBoundedContextsController);
        handler = module.get<IamCreateBoundedContextsHandler>(IamCreateBoundedContextsHandler);
    });

    describe('main', () =>
    {
        test('IamCreateBoundedContextsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an boundedContexts created', async () =>
        {
            expect(await controller.main(boundedContexts)).toBe(undefined);
        });
    });
});