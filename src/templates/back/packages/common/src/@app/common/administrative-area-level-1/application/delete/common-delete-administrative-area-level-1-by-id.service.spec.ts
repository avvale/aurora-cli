/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';
import { CommonDeleteAdministrativeAreaLevel1ByIdService } from './common-delete-administrative-area-level-1-by-id.service';
import { CommonAdministrativeAreaLevel1Id } from '../../domain/value-objects';
import { CommonIAdministrativeAreaLevel1Repository } from '../../domain/common-administrative-area-level-1.repository';
import { CommonMockAdministrativeAreaLevel1Repository } from '../../infrastructure/mock/common-mock-administrative-area-level-1.repository';

describe('CommonDeleteAdministrativeAreaLevel1ByIdService', () =>
{
    let service: CommonDeleteAdministrativeAreaLevel1ByIdService;
    let repository: CommonIAdministrativeAreaLevel1Repository;
    let mockRepository: CommonMockAdministrativeAreaLevel1Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteAdministrativeAreaLevel1ByIdService,
                CommonMockAdministrativeAreaLevel1Repository,
                {
                    provide : CommonIAdministrativeAreaLevel1Repository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteAdministrativeAreaLevel1ByIdService);
        repository = module.get(CommonIAdministrativeAreaLevel1Repository);
        mockRepository = module.get(CommonMockAdministrativeAreaLevel1Repository);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreaLevel1ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete administrativeAreaLevel1 and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new CommonAdministrativeAreaLevel1Id(commonMockAdministrativeAreaLevel1Data[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
