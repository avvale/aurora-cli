/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateLangsService } from './create-langs.service';
import { ILangRepository } from '../../domain/lang.repository';
import { MockLangRepository } from '../../infrastructure/mock/mock-lang.repository';

describe('CreateLangsService', () =>
{
    let service: CreateLangsService;
    let repository: ILangRepository;
    let mockRepository: MockLangRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateLangsService,
                MockLangRepository,
                {
                    provide : ILangRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CreateLangsService);
        repository      = module.get(ILangRepository);
        mockRepository  = module.get(MockLangRepository);
    });

    describe('main', () =>
    {
        test('CreateLangsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create langs and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource,
            )).toBe(undefined);
        });
    });
});