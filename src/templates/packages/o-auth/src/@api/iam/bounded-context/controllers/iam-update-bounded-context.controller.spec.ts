/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateBoundedContextController } from './iam-update-bounded-context.controller';
import { IamUpdateBoundedContextHandler } from '../handlers/iam-update-bounded-context.handler';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamUpdateBoundedContextController', () =>
{
    let controller: IamUpdateBoundedContextController;
    let handler: IamUpdateBoundedContextHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateBoundedContextController,
            ],
            providers: [
                {
                    provide : IamUpdateBoundedContextHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdateBoundedContextController>(IamUpdateBoundedContextController);
        handler = module.get<IamUpdateBoundedContextHandler>(IamUpdateBoundedContextHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateBoundedContextController should be defined', () =>
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