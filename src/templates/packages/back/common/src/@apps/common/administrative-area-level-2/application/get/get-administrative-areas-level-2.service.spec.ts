import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { GetAdministrativeAreasLevel2Service } from './get-administrative-areas-level-2.service';
import { IAdministrativeAreaLevel2Repository } from '../../domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Repository } from '../../infrastructure/mock/mock-administrative-area-level-2.repository';

describe('GetAdministrativeAreasLevel2Service', () =>
{
    let service: GetAdministrativeAreasLevel2Service;
    let repository: IAdministrativeAreaLevel2Repository;
    let mockRepository: MockAdministrativeAreaLevel2Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                GetAdministrativeAreasLevel2Service,
                MockAdministrativeAreaLevel2Repository,
                {
                    provide : IAdministrativeAreaLevel2Repository,
                    useValue: {
                        get: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(GetAdministrativeAreasLevel2Service);
        repository      = module.get(IAdministrativeAreaLevel2Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel2Repository);
    });

    describe('main', () =>
    {
        test('GetAdministrativeAreasLevel2Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should get administrativeAreasLevel2', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource)));
            expect(await service.main()).toBe(mockRepository.collectionSource);
        });
    });
});