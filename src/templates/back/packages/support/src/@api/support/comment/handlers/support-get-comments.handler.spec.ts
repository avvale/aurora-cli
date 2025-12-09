/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportGetCommentsHandler } from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportGetCommentsHandler', () => {
    let handler: SupportGetCommentsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportGetCommentsHandler,
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

        handler = module.get<SupportGetCommentsHandler>(
            SupportGetCommentsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('SupportGetCommentsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('SupportGetCommentsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a supportMockCommentData', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(supportMockCommentData)),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                supportMockCommentData,
            );
        });
    });
});
