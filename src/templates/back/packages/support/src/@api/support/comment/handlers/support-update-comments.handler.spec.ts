/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportUpdateCommentsInput } from '@api/graphql';
import { SupportUpdateCommentsHandler } from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateCommentsHandler', () => {
    let handler: SupportUpdateCommentsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportUpdateCommentsHandler,
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

        handler = module.get<SupportUpdateCommentsHandler>(
            SupportUpdateCommentsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('SupportUpdateCommentsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('SupportUpdateCommentsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a comments updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(supportMockCommentData[0]),
                    ),
            );
            expect(
                await handler.main(
                    <SupportUpdateCommentsInput>supportMockCommentData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(supportMockCommentData[0]);
        });
    });
});
