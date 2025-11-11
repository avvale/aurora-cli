/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsIKeyValueRepository,
    ToolsMockKeyValueRepository,
} from '@app/tools/key-value';
import { ToolsDeleteKeyValuesService } from '@app/tools/key-value/application/delete/tools-delete-key-values.service';
import {
    CommandBus,
    EventBus,
    EventPublisher,
    UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteKeyValuesService', () => {
    let service: ToolsDeleteKeyValuesService;
    let repository: ToolsIKeyValueRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                ToolsDeleteKeyValuesService,
                ToolsMockKeyValueRepository,
                {
                    provide: ToolsIKeyValueRepository,
                    useValue: {
                        get: () => {
                            /**/
                        },
                        delete: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        service = module.get(ToolsDeleteKeyValuesService);
        repository = module.get(ToolsIKeyValueRepository);
    });

    describe('main', () => {
        test('ToolsDeleteKeyValuesService should be defined', () => {
            expect(service).toBeDefined();
        });

        test('should delete keyValue and emit event', async () => {
            jest.spyOn(repository, 'get').mockImplementation(
                () => new Promise((resolve) => resolve([])),
            );
            expect(await service.main({}, {})).toBe(undefined);
        });
    });
});
