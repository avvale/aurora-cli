/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamPaginateBoundedContextsHandler } from '@api/iam/bounded-context';
import { iamMockBoundedContextData } from '@app/iam/bounded-context';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateBoundedContextsHandler', () => {
    let handler: IamPaginateBoundedContextsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                IamPaginateBoundedContextsHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<IamPaginateBoundedContextsHandler>(
            IamPaginateBoundedContextsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('IamPaginateBoundedContextsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('IamPaginateBoundedContextsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a boundedContexts', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: iamMockBoundedContextData.length,
                            count: iamMockBoundedContextData.length,
                            rows: iamMockBoundedContextData,
                        }),
                    ),
            );
            expect(await handler.main({}, {})).toEqual({
                total: iamMockBoundedContextData.length,
                count: iamMockBoundedContextData.length,
                rows: iamMockBoundedContextData,
            });
        });
    });
});
