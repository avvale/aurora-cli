/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { CommonCreateAdministrativeAreasLevel2Service } from './common-create-administrative-areas-level-2.service';
import { CommonIAdministrativeAreaLevel2Repository } from '../../domain/common-administrative-area-level-2.repository';
import { CommonMockAdministrativeAreaLevel2Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-2.repository';

describe('CommonCreateAdministrativeAreasLevel2Service', () =>
{
    let service: CommonCreateAdministrativeAreasLevel2Service;
    let mockRepository: CommonMockAdministrativeAreaLevel2Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonCreateAdministrativeAreasLevel2Service,
                CommonMockAdministrativeAreaLevel2Repository,
                {
                    provide : CommonIAdministrativeAreaLevel2Repository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonCreateAdministrativeAreasLevel2Service);
        mockRepository = module.get(CommonMockAdministrativeAreaLevel2Repository);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreasLevel2Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create administrativeAreasLevel2 and emit event', async () =>
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
