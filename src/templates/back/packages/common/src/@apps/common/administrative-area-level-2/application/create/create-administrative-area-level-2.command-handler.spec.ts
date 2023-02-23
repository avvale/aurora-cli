import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { CreateAdministrativeAreaLevel2CommandHandler } from './create-administrative-area-level-2.command-handler';
import { CreateAdministrativeAreaLevel2Command } from './create-administrative-area-level-2.command';
import { CreateAdministrativeAreaLevel2Service } from './create-administrative-area-level-2.service';

describe('CreateAdministrativeAreaLevel2CommandHandler', () =>
{
    let commandHandler: CreateAdministrativeAreaLevel2CommandHandler;
    let service: CreateAdministrativeAreaLevel2Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAdministrativeAreaLevel2CommandHandler,
                {
                    provide : CreateAdministrativeAreaLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateAdministrativeAreaLevel2CommandHandler>(CreateAdministrativeAreaLevel2CommandHandler);
        service         = module.get<CreateAdministrativeAreaLevel2Service>(CreateAdministrativeAreaLevel2Service);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreaLevel2CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateAdministrativeAreaLevel2Service', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAdministrativeAreaLevel2Command(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});