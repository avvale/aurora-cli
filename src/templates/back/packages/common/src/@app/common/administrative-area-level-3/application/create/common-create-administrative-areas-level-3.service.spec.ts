/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonCreateAdministrativeAreasLevel3Service } from './common-create-administrative-areas-level-3.service';
import { CommonIAdministrativeAreaLevel3Repository } from '../../domain/common-administrative-area-level-3.repository';
import { CommonMockAdministrativeAreaLevel3Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-3.repository';

describe('CommonCreateAdministrativeAreasLevel3Service', () =>
{
    let service: CommonCreateAdministrativeAreasLevel3Service;
    let mockRepository: CommonMockAdministrativeAreaLevel3Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonCreateAdministrativeAreasLevel3Service,
                CommonMockAdministrativeAreaLevel3Repository,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonCreateAdministrativeAreasLevel3Service);
        mockRepository = module.get(CommonMockAdministrativeAreaLevel3Repository);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreasLevel3Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create administrativeAreasLevel3 and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
