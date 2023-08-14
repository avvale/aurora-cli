import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonFindAdministrativeAreaLevel1Service } from './common-find-administrative-area-level-1.service';
import { CommonIAdministrativeAreaLevel1Repository } from '../../domain/common-administrative-area-level-1.repository';
import { CommonMockAdministrativeAreaLevel1Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-1.repository';

describe('CommonFindAdministrativeAreaLevel1Service', () =>
{
    let service: CommonFindAdministrativeAreaLevel1Service;
    let repository: CommonIAdministrativeAreaLevel1Repository;
    let mockRepository: CommonMockAdministrativeAreaLevel1Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonFindAdministrativeAreaLevel1Service,
                CommonMockAdministrativeAreaLevel1Repository,
                {
                    provide : CommonIAdministrativeAreaLevel1Repository,
                    useValue: {
                        find: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonFindAdministrativeAreaLevel1Service);
        repository = module.get(CommonIAdministrativeAreaLevel1Repository);
        mockRepository = module.get(CommonMockAdministrativeAreaLevel1Repository);
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel1Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find administrativeAreaLevel1', async () =>
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main()).toBe(mockRepository.collectionSource[0]);
        });
    });
});
