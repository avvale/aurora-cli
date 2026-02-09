/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { CommonAdministrativeAreasCountryHandler } from '../handlers/common-administrative-areas-country.handler';
import { CommonAdministrativeAreasCountryController } from './common-administrative-areas-country.controller';

describe('CommonAdministrativeAreasCountryController', () => {
  let controller: CommonAdministrativeAreasCountryController;
  let handler: CommonAdministrativeAreasCountryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [CommonAdministrativeAreasCountryController],
      providers: [
        {
          provide: CommonAdministrativeAreasCountryHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonAdministrativeAreasCountryController>(
      CommonAdministrativeAreasCountryController,
    );
    handler = module.get<CommonAdministrativeAreasCountryHandler>(
      CommonAdministrativeAreasCountryHandler,
    );
  });

  describe('main', () => {
    test('CommonAdministrativeAreasCountryController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
