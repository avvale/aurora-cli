/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsCreateMigrationInput } from '@api/graphql';
import {
    ToolsCreateMigrationHandler,
    ToolsCreateMigrationResolver,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateMigrationResolver', () => {
    let resolver: ToolsCreateMigrationResolver;
    let handler: ToolsCreateMigrationHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsCreateMigrationResolver,
                {
                    provide: ToolsCreateMigrationHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsCreateMigrationResolver>(
            ToolsCreateMigrationResolver,
        );
        handler = module.get<ToolsCreateMigrationHandler>(
            ToolsCreateMigrationHandler,
        );
    });

    test('ToolsCreateMigrationResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsCreateMigrationResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an migration created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockMigrationData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <ToolsCreateMigrationInput>toolsMockMigrationData[0],
                ),
            ).toBe(toolsMockMigrationData[0]);
        });
    });
});
