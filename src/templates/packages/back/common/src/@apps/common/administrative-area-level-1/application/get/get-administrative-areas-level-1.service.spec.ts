import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetAdministrativeAreasLevel1Service } from './get-administrative-areas-level-1.service';
import { IAdministrativeAreaLevel1Repository } from '../../domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Repository } from '../../infrastructure/mock/mock-administrative-area-level-1.repository';

describe('GetAdministrativeAreasLevel1Service', () =>
{
    let service: GetAdministrativeAreasLevel1Service;
    let repository: IAdministrativeAreaLevel1Repository;
    let mockRepository: MockAdministrativeAreaLevel1Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetAdministrativeAreasLevel1Service,
                MockAdministrativeAreaLevel1Repository,
                {
                    provide : IAdministrativeAreaLevel1Repository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(GetAdministrativeAreasLevel1Service);
        repository      = module.get(IAdministrativeAreaLevel1Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel1Repository);
    });

    describe('main', () =>
    {
        test('GetAdministrativeAreasLevel1Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get administrativeAreasLevel1', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});