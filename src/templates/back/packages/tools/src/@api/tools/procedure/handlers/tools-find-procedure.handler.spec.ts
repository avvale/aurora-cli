/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindProcedureHandler } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindProcedureHandler', () => {
    let handler: ToolsFindProcedureHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsFindProcedureHandler,
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

        handler = module.get<ToolsFindProcedureHandler>(
            ToolsFindProcedureHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsFindProcedureHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsFindProcedureHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a procedure', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockProcedureData[0]),
                    ),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                toolsMockProcedureData[0],
            );
        });
    });
});
