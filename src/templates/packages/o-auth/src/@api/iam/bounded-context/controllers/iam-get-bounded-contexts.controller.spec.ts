/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetBoundedContextsController } from './iam-get-bounded-contexts.controller';
import { IamGetBoundedContextsHandler } from '../handlers/iam-get-bounded-contexts.handler';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamGetBoundedContextsController', () =>
{
    let controller: IamGetBoundedContextsController;
    let handler: IamGetBoundedContextsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamGetBoundedContextsController,
            ],
            providers: [
                {
                    provide : IamGetBoundedContextsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamGetBoundedContextsController>(IamGetBoundedContextsController);
        handler = module.get<IamGetBoundedContextsHandler>(IamGetBoundedContextsHandler);
    });

    describe('main', () =>
    {
        test('IamGetBoundedContextsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a boundedContexts', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts)));
            expect(await controller.main()).toBe(boundedContexts);
        });
    });
});