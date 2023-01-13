/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { DeleteAdministrativeAreaLevel3ByIdService } from './delete-administrative-area-level-3-by-id.service';
import { AdministrativeAreaLevel3Id } from '../../domain/value-objects';
import { IAdministrativeAreaLevel3Repository } from '../../domain/administrative-area-level-3.repository';
import { MockAdministrativeAreaLevel3Repository } from '../../infrastructure/mock/mock-administrative-area-level-3.repository';

describe('DeleteAdministrativeAreaLevel3ByIdService', () =>
{
    let service: DeleteAdministrativeAreaLevel3ByIdService;
    let repository: IAdministrativeAreaLevel3Repository;
    let mockRepository: MockAdministrativeAreaLevel3Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteAdministrativeAreaLevel3ByIdService,
                MockAdministrativeAreaLevel3Repository,
                {
                    provide : IAdministrativeAreaLevel3Repository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(DeleteAdministrativeAreaLevel3ByIdService);
        repository      = module.get(IAdministrativeAreaLevel3Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel3Repository);
    });

    describe('main', () =>
    {
        test('DeleteAdministrativeAreaLevel3ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete administrativeAreaLevel3 and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AdministrativeAreaLevel3Id(administrativeAreasLevel3[0].id),
            )).toBe(undefined);
        });
    });
});