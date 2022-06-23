/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteAdministrativeAreasLevel1Service } from './delete-administrative-areas-level-1.service';
import { IAdministrativeAreaLevel1Repository } from '../../domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Repository } from '../../infrastructure/mock/mock-administrative-area-level-1.repository';

describe('DeleteAdministrativeAreasLevel1Service', () =>
{
    let service: DeleteAdministrativeAreasLevel1Service;
    let repository: IAdministrativeAreaLevel1Repository;
    let mockRepository: MockAdministrativeAreaLevel1Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteAdministrativeAreasLevel1Service,
                MockAdministrativeAreaLevel1Repository,
                {
                    provide : IAdministrativeAreaLevel1Repository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service         = module.get(DeleteAdministrativeAreasLevel1Service);
        repository      = module.get(IAdministrativeAreaLevel1Repository);
        mockRepository  = module.get(MockAdministrativeAreaLevel1Repository);
    });

    describe('main', () =>
    {
        test('DeleteAdministrativeAreasLevel1Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete administrativeAreaLevel1 and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main()).toBe(undefined);
        });
    });
});