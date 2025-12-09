/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportFindIssueHandler } from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindIssueHandler', () => {
    let handler: SupportFindIssueHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportFindIssueHandler,
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

        handler = module.get<SupportFindIssueHandler>(SupportFindIssueHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('SupportFindIssueHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('SupportFindIssueHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a issue', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(supportMockIssueData[0])),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                supportMockIssueData[0],
            );
        });
    });
});
