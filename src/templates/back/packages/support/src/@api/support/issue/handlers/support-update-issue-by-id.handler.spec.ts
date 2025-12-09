/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportUpdateIssueByIdInput } from '@api/graphql';
import { SupportUpdateIssueByIdHandler } from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateIssueByIdHandler', () => {
    let handler: SupportUpdateIssueByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportUpdateIssueByIdHandler,
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

        handler = module.get<SupportUpdateIssueByIdHandler>(
            SupportUpdateIssueByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('SupportUpdateIssueByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('SupportUpdateIssueByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a issue updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(supportMockIssueData[0])),
            );
            expect(
                await handler.main(
                    <SupportUpdateIssueByIdInput>supportMockIssueData[0],
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(supportMockIssueData[0]);
        });
    });
});
