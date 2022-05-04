/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamPaginateBoundedContextsController } from './iam-paginate-bounded-contexts.controller';
import { IamPaginateBoundedContextsHandler } from '../handlers/iam-paginate-bounded-contexts.handler';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamPaginateBoundedContextsController', () =>
{
    let controller: IamPaginateBoundedContextsController;
    let handler: IamPaginateBoundedContextsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamPaginateBoundedContextsController,
            ],
            providers: [
                {
                    provide : IamPaginateBoundedContextsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ]
        }).compile();

        controller = module.get<IamPaginateBoundedContextsController>(IamPaginateBoundedContextsController);
        handler = module.get<IamPaginateBoundedContextsHandler>(IamPaginateBoundedContextsHandler);
    });

    describe('main', () =>
    {
        test('IamPaginateBoundedContextsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a boundedContexts', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : boundedContexts,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : boundedContexts,
            });
        });
    });
});