import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { FindAdministrativeAreaLevel2ByIdService } from './find-administrative-area-level-2-by-id.service';
import { AdministrativeAreaLevel2Id } from '../../domain/value-objects';
import { IAdministrativeAreaLevel2Repository } from '../../domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Repository } from '../../infrastructure/mock/mock-administrative-area-level-2.repository';

describe('FindAdministrativeAreaLevel2ByIdService', () =>
{
    let service: FindAdministrativeAreaLevel2ByIdService;
    let repository: IAdministrativeAreaLevel2Repository;
    let mockRepository: MockAdministrativeAreaLevel2Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindAdministrativeAreaLevel2ByIdService,
                MockAdministrativeAreaLevel2Repository,
                {
                    provide : IAdministrativeAreaLevel2Repository,
                    useValue: {
                        findById: id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(FindAdministrativeAreaLevel2ByIdService);
        repository      = module.get(IAdministrativeAreaLevel2Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel2Repository);
    });

    describe('main', () =>
    {
        test('FindAdministrativeAreaLevel2ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should find administrativeAreaLevel2 by id', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AdministrativeAreaLevel2Id(administrativeAreasLevel2[0].id),
            )).toBe(mockRepository.collectionSource[0]);
        });
    });
});