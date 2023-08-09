/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonDeleteAdministrativeAreasLevel3Service } from './common-delete-administrative-areas-level-3.service';
import { CommonIAdministrativeAreaLevel3Repository } from '../../domain/common-administrative-area-level-3.repository';
import { CommonMockAdministrativeAreaLevel3Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-3.repository';

describe('CommonDeleteAdministrativeAreasLevel3Service', () =>
{
    let service: CommonDeleteAdministrativeAreasLevel3Service;
    let repository: CommonIAdministrativeAreaLevel3Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteAdministrativeAreasLevel3Service,
                CommonMockAdministrativeAreaLevel3Repository,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteAdministrativeAreasLevel3Service);
        repository = module.get(CommonIAdministrativeAreaLevel3Repository);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel3Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete administrativeAreaLevel3 and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
