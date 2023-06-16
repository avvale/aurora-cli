/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { CommonDeleteLangByIdService } from './common-delete-lang-by-id.service';
import { CommonLangId } from '../../domain/value-objects';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { MockLangRepository } from '../../infrastructure/mock/mock-lang.repository';

describe('CommonDeleteLangByIdService', () =>
{
    let service: CommonDeleteLangByIdService;
    let repository: CommonILangRepository;
    let mockRepository: MockLangRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteLangByIdService,
                MockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(DeleteLangByIdService);
        repository = module.get(CommonILangRepository);
        mockRepository = module.get(MockLangRepository);
    });

    describe('main', () =>
    {
        test('DeleteLangByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete lang and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new LangId(langs[0].id),
            )).toBe(undefined);
        });
    });
});