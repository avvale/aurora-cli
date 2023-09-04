/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAdministrativeAreaLevel3Repository, commonMockAdministrativeAreaLevel3Data, CommonMockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3';
import { CommonDeleteAdministrativeAreaLevel3ByIdService } from '@app/common/administrative-area-level-3/application/delete/common-delete-administrative-area-level-3-by-id.service';
import { CommonAdministrativeAreaLevel3Id } from '@app/common/administrative-area-level-3/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreaLevel3ByIdService', () =>
{
    let service: CommonDeleteAdministrativeAreaLevel3ByIdService;
    let repository: CommonIAdministrativeAreaLevel3Repository;
    let mockRepository: CommonMockAdministrativeAreaLevel3Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteAdministrativeAreaLevel3ByIdService,
                CommonMockAdministrativeAreaLevel3Repository,
                {
                    provide : CommonIAdministrativeAreaLevel3Repository,
                    useValue: {
                        deleteById: id => { /**/ },
                        findById  : id => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteAdministrativeAreaLevel3ByIdService);
        repository = module.get(CommonIAdministrativeAreaLevel3Repository);
        mockRepository = module.get(CommonMockAdministrativeAreaLevel3Repository);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreaLevel3ByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete administrativeAreaLevel3 and emit event', async () =>
        {
            jest.spyOn(repository, 'findById').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(
                await service.main(
                    new CommonAdministrativeAreaLevel3Id(commonMockAdministrativeAreaLevel3Data[0].id),
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
