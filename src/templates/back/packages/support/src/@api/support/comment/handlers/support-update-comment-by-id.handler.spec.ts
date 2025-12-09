/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportUpdateCommentByIdInput } from '@api/graphql';
import { SupportUpdateCommentByIdHandler } from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateCommentByIdHandler', () => {
    let handler: SupportUpdateCommentByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportUpdateCommentByIdHandler,
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

        handler = module.get<SupportUpdateCommentByIdHandler>(
            SupportUpdateCommentByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('SupportUpdateCommentByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('SupportUpdateCommentByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a comment updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(supportMockCommentData[0]),
                    ),
            );
            expect(
                await handler.main(
                    <SupportUpdateCommentByIdInput>supportMockCommentData[0],
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(supportMockCommentData[0]);
        });
    });
});
