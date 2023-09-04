import { commonMockAdministrativeAreaLevel1Data, CommonUpdateAdministrativeAreaLevel1ByIdCommand } from '@app/common/administrative-area-level-1';
import { CommonUpdateAdministrativeAreaLevel1ByIdCommandHandler } from '@app/common/administrative-area-level-1/application/update/common-update-administrative-area-level-1-by-id.command-handler';
import { CommonUpdateAdministrativeAreaLevel1ByIdService } from '@app/common/administrative-area-level-1/application/update/common-update-administrative-area-level-1-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreaLevel1ByIdCommandHandler', () =>
{
    let commandHandler: CommonUpdateAdministrativeAreaLevel1ByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateAdministrativeAreaLevel1ByIdCommandHandler,
                {
                    provide : CommonUpdateAdministrativeAreaLevel1ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateAdministrativeAreaLevel1ByIdCommandHandler>(CommonUpdateAdministrativeAreaLevel1ByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreaLevel1ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 created', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateAdministrativeAreaLevel1ByIdCommand(
                    {
                        id: commonMockAdministrativeAreaLevel1Data[0].id,
                        countryId: commonMockAdministrativeAreaLevel1Data[0].countryId,
                        code: commonMockAdministrativeAreaLevel1Data[0].code,
                        customCode: commonMockAdministrativeAreaLevel1Data[0].customCode,
                        name: commonMockAdministrativeAreaLevel1Data[0].name,
                        slug: commonMockAdministrativeAreaLevel1Data[0].slug,
                        latitude: commonMockAdministrativeAreaLevel1Data[0].latitude,
                        longitude: commonMockAdministrativeAreaLevel1Data[0].longitude,
                        zoom: commonMockAdministrativeAreaLevel1Data[0].zoom,
                        mapType: commonMockAdministrativeAreaLevel1Data[0].mapType,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
