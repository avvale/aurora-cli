import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { UpdateAdministrativeAreaLevel2ByIdCommandHandler } from './update-administrative-area-level-2-by-id.command-handler';
import { UpdateAdministrativeAreaLevel2ByIdCommand } from './update-administrative-area-level-2-by-id.command';
import { UpdateAdministrativeAreaLevel2ByIdService } from './update-administrative-area-level-2-by-id.service';

describe('UpdateAdministrativeAreaLevel2ByIdCommandHandler', () =>
{
    let commandHandler: UpdateAdministrativeAreaLevel2ByIdCommandHandler;
    let service: UpdateAdministrativeAreaLevel2ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAdministrativeAreaLevel2ByIdCommandHandler,
                {
                    provide : UpdateAdministrativeAreaLevel2ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateAdministrativeAreaLevel2ByIdCommandHandler>(UpdateAdministrativeAreaLevel2ByIdCommandHandler);
        service         = module.get<UpdateAdministrativeAreaLevel2ByIdService>(UpdateAdministrativeAreaLevel2ByIdService);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreaLevel2ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAdministrativeAreaLevel2ByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});