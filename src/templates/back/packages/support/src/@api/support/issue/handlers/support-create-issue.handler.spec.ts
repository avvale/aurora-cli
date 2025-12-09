/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportCreateIssueHandler } from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportCreateIssueHandler', () => {
    let handler: SupportCreateIssueHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportCreateIssueHandler,
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

        handler = module.get<SupportCreateIssueHandler>(
            SupportCreateIssueHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('SupportCreateIssueHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an issue created', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(supportMockIssueData[0])),
            );
            expect(
                await handler.main(supportMockIssueData[0], 'Europe/Madrid'),
            ).toBe(supportMockIssueData[0]);
        });
    });
});
