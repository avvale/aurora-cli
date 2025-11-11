/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateProceduresInput } from '@api/graphql';
import { ToolsUpdateProceduresHandler } from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateProceduresHandler', () => {
    let handler: ToolsUpdateProceduresHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsUpdateProceduresHandler,
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

        handler = module.get<ToolsUpdateProceduresHandler>(
            ToolsUpdateProceduresHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsUpdateProceduresHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsUpdateProceduresHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a procedures updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockProcedureData[0]),
                    ),
            );
            expect(
                await handler.main(
                    <ToolsUpdateProceduresInput>toolsMockProcedureData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(toolsMockProcedureData[0]);
        });
    });
});
