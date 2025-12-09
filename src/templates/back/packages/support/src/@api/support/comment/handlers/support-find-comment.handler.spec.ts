/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportFindCommentHandler } from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindCommentHandler', () => {
    let handler: SupportFindCommentHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportFindCommentHandler,
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

        handler = module.get<SupportFindCommentHandler>(
            SupportFindCommentHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('SupportFindCommentHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('SupportFindCommentHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a comment', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(supportMockCommentData[0]),
                    ),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                supportMockCommentData[0],
            );
        });
    });
});
