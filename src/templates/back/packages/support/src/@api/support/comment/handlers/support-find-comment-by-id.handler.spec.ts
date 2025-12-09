/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportFindCommentByIdHandler } from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindCommentByIdHandler', () => {
    let handler: SupportFindCommentByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportFindCommentByIdHandler,
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

        handler = module.get<SupportFindCommentByIdHandler>(
            SupportFindCommentByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('SupportFindCommentByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('SupportFindCommentByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an comment by id', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(supportMockCommentData[0]),
                    ),
            );
            expect(
                await handler.main(
                    supportMockCommentData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(supportMockCommentData[0]);
        });
    });
});
