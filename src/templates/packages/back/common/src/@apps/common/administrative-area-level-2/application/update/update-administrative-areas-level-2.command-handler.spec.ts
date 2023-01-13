import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { UpdateAdministrativeAreasLevel2CommandHandler } from './update-administrative-areas-level-2.command-handler';
import { UpdateAdministrativeAreasLevel2Command } from './update-administrative-areas-level-2.command';
import { UpdateAdministrativeAreasLevel2Service } from './update-administrative-areas-level-2.service';

describe('UpdateAdministrativeAreasLevel2CommandHandler', () =>
{
    let commandHandler: UpdateAdministrativeAreasLevel2CommandHandler;
    let service: UpdateAdministrativeAreasLevel2Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAdministrativeAreasLevel2CommandHandler,
                {
                    provide : UpdateAdministrativeAreasLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateAdministrativeAreasLevel2CommandHandler>(UpdateAdministrativeAreasLevel2CommandHandler);
        service         = module.get<UpdateAdministrativeAreasLevel2Service>(UpdateAdministrativeAreasLevel2Service);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreasLevel2CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAdministrativeAreasLevel2Command(
                    {
                        id: administrativeAreasLevel2[0].id,
                        countryId: administrativeAreasLevel2[0].countryId,
                        administrativeAreaLevel1Id: administrativeAreasLevel2[0].administrativeAreaLevel1Id,
                        code: administrativeAreasLevel2[0].code,
                        customCode: administrativeAreasLevel2[0].customCode,
                        name: administrativeAreasLevel2[0].name,
                        slug: administrativeAreasLevel2[0].slug,
                        latitude: administrativeAreasLevel2[0].latitude,
                        longitude: administrativeAreasLevel2[0].longitude,
                        zoom: administrativeAreasLevel2[0].zoom,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});