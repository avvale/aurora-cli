/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAdministrativeAreaLevel3ByIdController } from './common-find-administrative-area-level-3-by-id.controller';
import { CommonFindAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-find-administrative-area-level-3-by-id.handler';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonFindAdministrativeAreaLevel3ByIdController', () =>
{
    let controller: CommonFindAdministrativeAreaLevel3ByIdController;
    let handler: CommonFindAdministrativeAreaLevel3ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindAdministrativeAreaLevel3ByIdController,
            ],
            providers: [
                {
                    provide : CommonFindAdministrativeAreaLevel3ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindAdministrativeAreaLevel3ByIdController>(CommonFindAdministrativeAreaLevel3ByIdController);
        handler = module.get<CommonFindAdministrativeAreaLevel3ByIdHandler>(CommonFindAdministrativeAreaLevel3ByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel3ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await controller.main(administrativeAreasLevel3[0].id)).toBe(administrativeAreasLevel3[0]);
        });
    });
});