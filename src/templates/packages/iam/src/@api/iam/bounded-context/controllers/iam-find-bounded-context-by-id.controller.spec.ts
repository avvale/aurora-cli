/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindBoundedContextByIdController } from './iam-find-bounded-context-by-id.controller';
import { IamFindBoundedContextByIdHandler } from '../handlers/iam-find-bounded-context-by-id.handler';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamFindBoundedContextByIdController', () =>
{
    let controller: IamFindBoundedContextByIdController;
    let handler: IamFindBoundedContextByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindBoundedContextByIdController,
            ],
            providers: [
                {
                    provide : IamFindBoundedContextByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindBoundedContextByIdController>(IamFindBoundedContextByIdController);
        handler = module.get<IamFindBoundedContextByIdHandler>(IamFindBoundedContextByIdHandler);
    });

    describe('main', () =>
    {
        test('IamFindBoundedContextByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an boundedContext by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await controller.main(boundedContexts[0].id)).toBe(boundedContexts[0]);
        });
    });
});