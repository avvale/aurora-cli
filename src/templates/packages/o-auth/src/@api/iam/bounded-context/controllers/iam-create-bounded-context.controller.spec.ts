/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateBoundedContextController } from './iam-create-bounded-context.controller';
import { IamCreateBoundedContextHandler } from '../handlers/iam-create-bounded-context.handler';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamCreateBoundedContextController', () =>
{
    let controller: IamCreateBoundedContextController;
    let handler: IamCreateBoundedContextHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamCreateBoundedContextController,
            ],
            providers: [
                {
                    provide : IamCreateBoundedContextHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreateBoundedContextController>(IamCreateBoundedContextController);
        handler = module.get<IamCreateBoundedContextHandler>(IamCreateBoundedContextHandler);
    });

    describe('main', () =>
    {
        test('IamCreateBoundedContextController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an boundedContext created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await controller.main(boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});