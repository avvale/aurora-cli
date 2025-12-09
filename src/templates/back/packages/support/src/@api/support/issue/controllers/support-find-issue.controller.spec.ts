import {
    SupportFindIssueController,
    SupportFindIssueHandler,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindIssueController', () => {
    let controller: SupportFindIssueController;
    let handler: SupportFindIssueHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [SupportFindIssueController],
            providers: [
                {
                    provide: SupportFindIssueHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<SupportFindIssueController>(
            SupportFindIssueController,
        );
        handler = module.get<SupportFindIssueHandler>(SupportFindIssueHandler);
    });

    describe('main', () => {
        test('SupportFindIssueController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a issue', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(supportMockIssueData[0])),
            );
            expect(await controller.main()).toBe(supportMockIssueData[0]);
        });
    });
});
