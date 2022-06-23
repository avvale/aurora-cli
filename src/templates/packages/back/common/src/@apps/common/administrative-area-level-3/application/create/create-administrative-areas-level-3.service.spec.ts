/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { CreateAdministrativeAreasLevel3Service } from './create-administrative-areas-level-3.service';
import { IAdministrativeAreaLevel3Repository } from '../../domain/administrative-area-level-3.repository';
import { MockAdministrativeAreaLevel3Repository } from '../../infrastructure/mock/mock-administrative-area-level-3.repository';

describe('CreateAdministrativeAreasLevel3Service', () =>
{
    let service: CreateAdministrativeAreasLevel3Service;
    let repository: IAdministrativeAreaLevel3Repository;
    let mockRepository: MockAdministrativeAreaLevel3Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateAdministrativeAreasLevel3Service,
                MockAdministrativeAreaLevel3Repository,
                {
                    provide : IAdministrativeAreaLevel3Repository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(CreateAdministrativeAreasLevel3Service);
        repository      = module.get(IAdministrativeAreaLevel3Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel3Repository);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreasLevel3Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create administrativeAreasLevel3 and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource,
            )).toBe(undefined);
        });
    });
});