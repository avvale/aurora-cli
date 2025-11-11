/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsDeleteMigrationByIdHandler,
    ToolsDeleteMigrationByIdResolver,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteMigrationByIdResolver', () => {
    let resolver: ToolsDeleteMigrationByIdResolver;
    let handler: ToolsDeleteMigrationByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsDeleteMigrationByIdResolver,
                {
                    provide: ToolsDeleteMigrationByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsDeleteMigrationByIdResolver>(
            ToolsDeleteMigrationByIdResolver,
        );
        handler = module.get<ToolsDeleteMigrationByIdHandler>(
            ToolsDeleteMigrationByIdHandler,
        );
    });

    test('ToolsDeleteMigrationByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsDeleteMigrationByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an migration deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockMigrationData[0]),
                    ),
            );
            expect(await resolver.main(toolsMockMigrationData[0].id)).toBe(
                toolsMockMigrationData[0],
            );
        });
    });
});
