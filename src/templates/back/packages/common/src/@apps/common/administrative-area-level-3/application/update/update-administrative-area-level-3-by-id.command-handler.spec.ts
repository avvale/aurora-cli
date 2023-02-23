import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { UpdateAdministrativeAreaLevel3ByIdCommandHandler } from './update-administrative-area-level-3-by-id.command-handler';
import { UpdateAdministrativeAreaLevel3ByIdCommand } from './update-administrative-area-level-3-by-id.command';
import { UpdateAdministrativeAreaLevel3ByIdService } from './update-administrative-area-level-3-by-id.service';

describe('UpdateAdministrativeAreaLevel3ByIdCommandHandler', () =>
{
    let commandHandler: UpdateAdministrativeAreaLevel3ByIdCommandHandler;
    let service: UpdateAdministrativeAreaLevel3ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAdministrativeAreaLevel3ByIdCommandHandler,
                {
                    provide : UpdateAdministrativeAreaLevel3ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateAdministrativeAreaLevel3ByIdCommandHandler>(UpdateAdministrativeAreaLevel3ByIdCommandHandler);
        service         = module.get<UpdateAdministrativeAreaLevel3ByIdService>(UpdateAdministrativeAreaLevel3ByIdService);
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
                new UpdateAdministrativeAreaLevel3ByIdCommand(
                    {
                        id: administrativeAreasLevel3[0].id,
                        countryId: administrativeAreasLevel3[0].countryId,
                        administrativeAreaLevel1Id: administrativeAreasLevel3[0].administrativeAreaLevel1Id,
                        administrativeAreaLevel2Id: administrativeAreasLevel3[0].administrativeAreaLevel2Id,
                        code: administrativeAreasLevel3[0].code,
                        customCode: administrativeAreasLevel3[0].customCode,
                        name: administrativeAreasLevel3[0].name,
                        slug: administrativeAreasLevel3[0].slug,
                        latitude: administrativeAreasLevel3[0].latitude,
                        longitude: administrativeAreasLevel3[0].longitude,
                        zoom: administrativeAreasLevel3[0].zoom,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});