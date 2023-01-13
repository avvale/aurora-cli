/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreaLevel2ByIdController } from './common-delete-administrative-area-level-2-by-id.controller';
import { CommonDeleteAdministrativeAreaLevel2ByIdHandler } from '../handlers/common-delete-administrative-area-level-2-by-id.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonDeleteAdministrativeAreaLevel2ByIdController', () =>
{
    let controller: CommonDeleteAdministrativeAreaLevel2ByIdController;
    let handler: CommonDeleteAdministrativeAreaLevel2ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteAdministrativeAreaLevel2ByIdController,
            ],
            providers: [
                {
                    provide : CommonDeleteAdministrativeAreaLevel2ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteAdministrativeAreaLevel2ByIdController>(CommonDeleteAdministrativeAreaLevel2ByIdController);
        handler = module.get<CommonDeleteAdministrativeAreaLevel2ByIdHandler>(CommonDeleteAdministrativeAreaLevel2ByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreaLevel2ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await controller.main(administrativeAreasLevel2[0].id)).toBe(administrativeAreasLevel2[0]);
        });
    });
});