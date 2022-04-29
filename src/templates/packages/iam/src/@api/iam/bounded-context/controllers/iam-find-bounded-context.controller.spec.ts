/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindBoundedContextController } from './iam-find-bounded-context.controller';
import { IamFindBoundedContextHandler } from '../handlers/iam-find-bounded-context.handler';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

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
        }).compile();

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await controller.main()).toBe(boundedContexts[0]);
        });
    });
});