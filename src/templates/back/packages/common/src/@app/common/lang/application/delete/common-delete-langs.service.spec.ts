/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteLangsService } from './delete-langs.service';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { MockLangRepository } from '../../infrastructure/mock/mock-lang.repository';

describe('CommonDeleteLangsService', () =>
{
    let service: DeleteLangsService;
    let repository: CommonILangRepository;
    let mockRepository: MockLangRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteLangsService,
                MockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(DeleteLangsService);
        repository = module.get(CommonILangRepository);
        mockRepository = module.get(MockLangRepository);
    });

    describe('main', () =>
    {
        test('DeleteLangsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete lang and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});