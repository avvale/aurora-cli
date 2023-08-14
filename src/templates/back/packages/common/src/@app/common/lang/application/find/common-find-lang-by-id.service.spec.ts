import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';
import { CommonFindLangByIdService } from './common-find-lang-by-id.service';
import { CommonLangId } from '../../domain/value-objects';
import { CommonILangRepository } from '../../domain/common-lang.repository';
import { CommonMockLangRepository } from '../../infrastructure/mock/common-mock-lang.repository';

describe('CommonFindLangByIdService', () =>
{
    let service: CommonFindLangByIdService;
    let repository: CommonILangRepository;
    let mockRepository: CommonMockLangRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonFindLangByIdService,
                CommonMockLangRepository,
                {
                    provide : CommonILangRepository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonFindLangByIdService);
        repository = module.get(CommonILangRepository);
        mockRepository = module.get(CommonMockLangRepository);
    });

    describe('main', () =>
    {
        test('FindLangByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find lang by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new CommonLangId(commonMockLangData[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});
