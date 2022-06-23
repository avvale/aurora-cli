import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { PaginateAdministrativeAreasLevel2Service } from './paginate-administrative-areas-level-2.service';
import { IAdministrativeAreaLevel2Repository } from '../../domain/administrative-area-level-2.repository';
import { MockAdministrativeAreaLevel2Repository } from '../../infrastructure/mock/mock-administrative-area-level-2.repository';

describe('PaginateAdministrativeAreasLevel2Service', () =>
{
    let service: PaginateAdministrativeAreasLevel2Service;
    let repository: IAdministrativeAreaLevel2Repository;
    let mockRepository: MockAdministrativeAreaLevel2Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateAdministrativeAreasLevel2Service,
                MockAdministrativeAreaLevel2Repository,
                {
                    provide : IAdministrativeAreaLevel2Repository,
                    useValue: {
                        paginate: (queryStatement, constraints) => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(PaginateAdministrativeAreasLevel2Service);
        repository      = module.get(IAdministrativeAreaLevel2Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel2Repository);
    });

    describe('main', () =>
    {
        test('PaginateAdministrativeAreasLevel2Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should paginate administrativeAreasLevel2', async () =>
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            })));
            expect(await service.main({
                offset: 0,
                limit : 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows : mockRepository.collectionSource.slice(0,10),
            });
        });
    });
});