import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { administrativeAreasLevel2 } from '../../../../../@apps/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { UpdateAdministrativeAreaLevel2CommandHandler } from './update-administrative-area-level-2.command-handler';
import { UpdateAdministrativeAreaLevel2Command } from './update-administrative-area-level-2.command';
import { UpdateAdministrativeAreaLevel2Service } from './update-administrative-area-level-2.service';

describe('UpdateAdministrativeAreaLevel2CommandHandler', () =>
{
    let commandHandler: UpdateAdministrativeAreaLevel2CommandHandler;
    let service: UpdateAdministrativeAreaLevel2Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAdministrativeAreaLevel2CommandHandler,
                {
                    provide : UpdateAdministrativeAreaLevel2Service,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        }).compile();

        commandHandler  = module.get<UpdateAdministrativeAreaLevel2CommandHandler>(UpdateAdministrativeAreaLevel2CommandHandler);
        service         = module.get<UpdateAdministrativeAreaLevel2Service>(UpdateAdministrativeAreaLevel2Service);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreaLevel2CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAdministrativeAreaLevel2Command(
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
                    { timezone: process.env.TZ }
                )
            )).toBe(undefined);
        });
    });
});