import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { FindAdministrativeAreaLevel3ByIdService } from './find-administrative-area-level-3-by-id.service';
import { AdministrativeAreaLevel3Id } from '../../domain/value-objects';
import { IAdministrativeAreaLevel3Repository } from '../../domain/administrative-area-level-3.repository';
import { MockAdministrativeAreaLevel3Repository } from '../../infrastructure/mock/mock-administrative-area-level-3.repository';

describe('FindAdministrativeAreaLevel3ByIdService', () =>
{
    let service: FindAdministrativeAreaLevel3ByIdService;
    let repository: IAdministrativeAreaLevel3Repository;
    let mockRepository: MockAdministrativeAreaLevel3Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindAdministrativeAreaLevel3ByIdService,
                MockAdministrativeAreaLevel3Repository,
                {
                    provide : IAdministrativeAreaLevel3Repository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(FindAdministrativeAreaLevel3ByIdService);
        repository      = module.get(IAdministrativeAreaLevel3Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel3Repository);
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel3ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find administrativeAreaLevel3 by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AdministrativeAreaLevel3Id(administrativeAreasLevel3[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});