import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { UpdateAdministrativeAreasLevel3CommandHandler } from './update-administrative-areas-level-3.command-handler';
import { UpdateAdministrativeAreasLevel3Command } from './update-administrative-areas-level-3.command';
import { UpdateAdministrativeAreasLevel3Service } from './update-administrative-areas-level-3.service';

describe('UpdateAdministrativeAreasLevel3CommandHandler', () =>
{
    let commandHandler: UpdateAdministrativeAreasLevel3CommandHandler;
    let service: UpdateAdministrativeAreasLevel3Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAdministrativeAreasLevel3CommandHandler,
                {
                    provide : UpdateAdministrativeAreasLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateAdministrativeAreasLevel3CommandHandler>(UpdateAdministrativeAreasLevel3CommandHandler);
        service         = module.get<UpdateAdministrativeAreasLevel3Service>(UpdateAdministrativeAreasLevel3Service);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreasLevel3CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel3 updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAdministrativeAreasLevel3Command(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});