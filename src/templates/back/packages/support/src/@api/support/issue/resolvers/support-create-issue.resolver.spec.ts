/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportCreateIssueInput } from '@api/graphql';
import {
    SupportCreateIssueHandler,
    SupportCreateIssueResolver,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportCreateIssueResolver', () => {
    let resolver: SupportCreateIssueResolver;
    let handler: SupportCreateIssueHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportCreateIssueResolver,
                {
                    provide: SupportCreateIssueHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<SupportCreateIssueResolver>(
            SupportCreateIssueResolver,
        );
        handler = module.get<SupportCreateIssueHandler>(
            SupportCreateIssueHandler,
        );
    });

    test('SupportCreateIssueResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('SupportCreateIssueResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an issue created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(supportMockIssueData[0])),
            );
            expect(
                await resolver.main(
                    <SupportCreateIssueInput>supportMockIssueData[0],
                ),
            ).toBe(supportMockIssueData[0]);
        });
    });
});
