import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { FindAdministrativeAreaLevel1ByIdService } from './find-administrative-area-level-1-by-id.service';
import { AdministrativeAreaLevel1Id } from '../../domain/value-objects';
import { IAdministrativeAreaLevel1Repository } from '../../domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Repository } from '../../infrastructure/mock/mock-administrative-area-level-1.repository';

describe('FindAdministrativeAreaLevel1ByIdService', () =>
{
    let service: FindAdministrativeAreaLevel1ByIdService;
    let repository: IAdministrativeAreaLevel1Repository;
    let mockRepository: MockAdministrativeAreaLevel1Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindAdministrativeAreaLevel1ByIdService,
                MockAdministrativeAreaLevel1Repository,
                {
                    provide : IAdministrativeAreaLevel1Repository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(FindAdministrativeAreaLevel1ByIdService);
        repository      = module.get(IAdministrativeAreaLevel1Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel1Repository);
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel1ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find administrativeAreaLevel1 by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AdministrativeAreaLevel1Id(administrativeAreasLevel1[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});