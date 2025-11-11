import { ToolsCreateProcedureInput } from '@api/graphql';
import {
    ToolsCreateProceduresHandler,
    ToolsCreateProceduresResolver,
} from '@api/tools/procedure';
import { toolsMockProcedureData } from '@app/tools/procedure';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateProceduresResolver', () => {
    let resolver: ToolsCreateProceduresResolver;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsCreateProceduresResolver,
                {
                    provide: ToolsCreateProceduresHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsCreateProceduresResolver>(
            ToolsCreateProceduresResolver,
        );
    });

    test('ToolsCreateProceduresResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsCreateProceduresResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an procedures created', async () => {
            expect(
                await resolver.main(
                    <ToolsCreateProcedureInput[]>toolsMockProcedureData,
                ),
            ).toBe(undefined);
        });
    });
});
