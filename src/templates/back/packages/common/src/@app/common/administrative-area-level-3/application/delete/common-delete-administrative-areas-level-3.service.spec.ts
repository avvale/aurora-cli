/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAdministrativeAreaLevel3Repository, CommonMockAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3';
import { CommonDeleteAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/delete/common-delete-administrative-areas-level-3.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

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
