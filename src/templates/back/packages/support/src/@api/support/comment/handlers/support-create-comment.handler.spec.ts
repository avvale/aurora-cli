/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportCreateCommentHandler } from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportCreateCommentHandler', () => {
    let handler: SupportCreateCommentHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportCreateCommentHandler,
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

        handler = module.get<SupportCreateCommentHandler>(
            SupportCreateCommentHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('SupportCreateCommentHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an comment created', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(supportMockCommentData[0]),
                    ),
            );
            expect(
                await handler.main(supportMockCommentData[0], 'Europe/Madrid'),
            ).toBe(supportMockCommentData[0]);
        });
    });
});
