/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonIAdministrativeAreaLevel2Repository, CommonMockAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2';
import { CommonDeleteAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/delete/common-delete-administrative-areas-level-2.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreasLevel2Service', () =>
{
    let service: CommonDeleteAdministrativeAreasLevel2Service;
    let repository: CommonIAdministrativeAreaLevel2Repository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonDeleteAdministrativeAreasLevel2Service,
                CommonMockAdministrativeAreaLevel2Repository,
                {
                    provide : CommonIAdministrativeAreaLevel2Repository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonDeleteAdministrativeAreasLevel2Service);
        repository = module.get(CommonIAdministrativeAreaLevel2Repository);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel2Service should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete administrativeAreaLevel2 and emit event', async () =>
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
