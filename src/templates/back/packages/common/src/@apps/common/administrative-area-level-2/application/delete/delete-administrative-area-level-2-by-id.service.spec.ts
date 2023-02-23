/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { DeleteAdministrativeAreaLevel2ByIdService } from './delete-administrative-area-level-2-by-id.service';
import { AdministrativeAreaLevel2Id } from '../../domain/value-objects';
import { IAdministrativeAreaLevel2Repository } from '../../domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Repository } from '../../infrastructure/mock/mock-administrative-area-level-2.repository';

describe('DeleteAdministrativeAreaLevel2ByIdService', () =>
{
    let service: DeleteAdministrativeAreaLevel2ByIdService;
    let repository: IAdministrativeAreaLevel2Repository;
    let mockRepository: MockAdministrativeAreaLevel2Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteAdministrativeAreaLevel2ByIdService,
                MockAdministrativeAreaLevel2Repository,
                {
                    provide : IAdministrativeAreaLevel2Repository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(DeleteAdministrativeAreaLevel2ByIdService);
        repository      = module.get(IAdministrativeAreaLevel2Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel2Repository);
    });

    describe('main', () =>
    {
        test('DeleteAdministrativeAreaLevel2ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete administrativeAreaLevel2 and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main(
                new AdministrativeAreaLevel2Id(administrativeAreasLevel2[0].id),
            )).toBe(undefined);
        });
    });
});