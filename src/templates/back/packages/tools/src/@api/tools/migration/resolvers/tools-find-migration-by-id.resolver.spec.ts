/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsFindMigrationByIdHandler,
    ToolsFindMigrationByIdResolver,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindMigrationByIdResolver', () => {
    let resolver: ToolsFindMigrationByIdResolver;
    let handler: ToolsFindMigrationByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsFindMigrationByIdResolver,
                {
                    provide: ToolsFindMigrationByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsFindMigrationByIdResolver>(
            ToolsFindMigrationByIdResolver,
        );
        handler = module.get<ToolsFindMigrationByIdHandler>(
            ToolsFindMigrationByIdHandler,
        );
    });

    test('ToolsFindMigrationByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsFindMigrationByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an migration by id', async () => {
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
