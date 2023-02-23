/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonPaginateLangsController } from './common-paginate-langs.controller';
import { CommonPaginateLangsHandler } from '../handlers/common-paginate-langs.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';

describe('CommonPaginateLangsController', () =>
{
    let controller: CommonPaginateLangsController;
    let handler: CommonPaginateLangsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonPaginateLangsController,
            ],
            providers: [
                {
                    provide : CommonPaginateLangsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonPaginateLangsController>(CommonPaginateLangsController);
        handler = module.get<CommonPaginateLangsHandler>(CommonPaginateLangsHandler);
    });

    describe('main', () =>
    {
        test('CommonPaginateLangsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a langs', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : langs,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : langs,
            });
        });
    });
});