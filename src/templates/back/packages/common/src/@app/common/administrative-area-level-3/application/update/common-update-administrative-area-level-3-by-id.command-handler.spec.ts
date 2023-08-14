import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';
import { CommonUpdateAdministrativeAreaLevel3ByIdCommandHandler } from './common-update-administrative-area-level-3-by-id.command-handler';
import { CommonUpdateAdministrativeAreaLevel3ByIdCommand } from './common-update-administrative-area-level-3-by-id.command';
import { CommonUpdateAdministrativeAreaLevel3ByIdService } from './common-update-administrative-area-level-3-by-id.service';

describe('CommonUpdateAdministrativeAreaLevel3ByIdCommandHandler', () =>
{
    let commandHandler: CommonUpdateAdministrativeAreaLevel3ByIdCommandHandler;
    let service: CommonUpdateAdministrativeAreaLevel3ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateAdministrativeAreaLevel3ByIdCommandHandler,
                {
                    provide : CommonUpdateAdministrativeAreaLevel3ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateAdministrativeAreaLevel3ByIdCommandHandler>(CommonUpdateAdministrativeAreaLevel3ByIdCommandHandler);
        service = module.get<CommonUpdateAdministrativeAreaLevel3ByIdService>(CommonUpdateAdministrativeAreaLevel3ByIdService);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreaLevel3ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 created', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateAdministrativeAreaLevel3ByIdCommand(
                    {
                        id: commonMockAdministrativeAreaLevel3Data[0].id,
                        countryId: commonMockAdministrativeAreaLevel3Data[0].countryId,
                        administrativeAreaLevel1Id: commonMockAdministrativeAreaLevel3Data[0].administrativeAreaLevel1Id,
                        administrativeAreaLevel2Id: commonMockAdministrativeAreaLevel3Data[0].administrativeAreaLevel2Id,
                        code: commonMockAdministrativeAreaLevel3Data[0].code,
                        customCode: commonMockAdministrativeAreaLevel3Data[0].customCode,
                        name: commonMockAdministrativeAreaLevel3Data[0].name,
                        slug: commonMockAdministrativeAreaLevel3Data[0].slug,
                        latitude: commonMockAdministrativeAreaLevel3Data[0].latitude,
                        longitude: commonMockAdministrativeAreaLevel3Data[0].longitude,
                        zoom: commonMockAdministrativeAreaLevel3Data[0].zoom,
                        mapType: commonMockAdministrativeAreaLevel3Data[0].mapType,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
