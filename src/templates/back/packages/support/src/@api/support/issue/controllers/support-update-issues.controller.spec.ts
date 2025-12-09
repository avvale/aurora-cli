import {
    SupportUpdateIssuesController,
    SupportUpdateIssuesHandler,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateIssuesController', () => {
    let controller: SupportUpdateIssuesController;
    let handler: SupportUpdateIssuesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [SupportUpdateIssuesController],
            providers: [
                {
                    provide: SupportUpdateIssuesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<SupportUpdateIssuesController>(
            SupportUpdateIssuesController,
        );
        handler = module.get<SupportUpdateIssuesHandler>(
            SupportUpdateIssuesHandler,
        );
    });

    describe('main', () => {
        test('SupportUpdateIssuesController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a issues updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(supportMockIssueData[0])),
            );
            expect(await controller.main(supportMockIssueData[0])).toBe(
                supportMockIssueData[0],
            );
        });
    });
});
