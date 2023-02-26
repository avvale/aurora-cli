/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpsertBoundedContextController } from './iam-upsert-bounded-context.controller';
import { IamUpsertBoundedContextHandler } from '../handlers/iam-upsert-bounded-context.handler';

// sources
import { boundedContexts } from '@app/iam/bounded-context/infrastructure/mock/mock-bounded-context.data';

describe('IamUpsertBoundedContextController', () =>
{
    let controller: IamUpsertBoundedContextController;
    let handler: IamUpsertBoundedContextHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertBoundedContextController,
            ],
            providers: [
                {
                    provide : IamUpsertBoundedContextHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertBoundedContextController>(IamUpsertBoundedContextController);
        handler = module.get<IamUpsertBoundedContextHandler>(IamUpsertBoundedContextHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertBoundedContextController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an boundedContext upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await controller.main(boundedContexts[0])).toBe(boundedContexts[0]);
        });
    });
});