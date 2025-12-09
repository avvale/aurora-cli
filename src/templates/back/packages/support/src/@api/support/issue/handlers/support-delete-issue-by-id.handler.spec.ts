/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportDeleteIssueByIdHandler } from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteIssueByIdController', () => {
    let handler: SupportDeleteIssueByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportDeleteIssueByIdHandler,
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

        handler = module.get<SupportDeleteIssueByIdHandler>(
            SupportDeleteIssueByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('SupportDeleteIssueByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an issue deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(supportMockIssueData[0])),
            );
            expect(
                await handler.main(
                    supportMockIssueData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(supportMockIssueData[0]);
        });
    });
});
