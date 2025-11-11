/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeleteBoundedContextByIdHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteBoundedContextByIdController', () => {
    let handler: IamDeleteBoundedContextByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamDeleteBoundedContextByIdHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<IamDeleteBoundedContextByIdHandler>(
            IamDeleteBoundedContextByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('IamDeleteBoundedContextByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an boundedContext deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(iamMockBoundedContextData[0]),
                    ),
            );
            expect(
                await handler.main(
                    iamMockBoundedContextData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(iamMockBoundedContextData[0]);
        });
    });
});
