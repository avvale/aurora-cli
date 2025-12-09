/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportUpdateIssuesInput } from '@api/graphql';
import {
    SupportUpdateIssuesHandler,
    SupportUpdateIssuesResolver,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateIssuesResolver', () => {
    let resolver: SupportUpdateIssuesResolver;
    let handler: SupportUpdateIssuesHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportUpdateIssuesResolver,
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

        resolver = module.get<SupportUpdateIssuesResolver>(
            SupportUpdateIssuesResolver,
        );
        handler = module.get<SupportUpdateIssuesHandler>(
            SupportUpdateIssuesHandler,
        );
    });

    test('SupportUpdateIssuesResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('SupportUpdateIssuesResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a issues updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(supportMockIssueData[0])),
            );
            expect(
                await resolver.main(
                    <SupportUpdateIssuesInput>supportMockIssueData[0],
                ),
            ).toBe(supportMockIssueData[0]);
        });
    });
});
