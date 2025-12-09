/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    SupportPaginateIssuesHandler,
    SupportPaginateIssuesResolver,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportPaginateIssuesResolver', () => {
    let resolver: SupportPaginateIssuesResolver;
    let handler: SupportPaginateIssuesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportPaginateIssuesResolver,
                {
                    provide: SupportPaginateIssuesHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<SupportPaginateIssuesResolver>(
            SupportPaginateIssuesResolver,
        );
        handler = module.get<SupportPaginateIssuesHandler>(
            SupportPaginateIssuesHandler,
        );
    });

    test('SupportPaginateIssuesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('SupportPaginateIssuesResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a supportMockIssueData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: supportMockIssueData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: supportMockIssueData,
            });
        });
    });
});
