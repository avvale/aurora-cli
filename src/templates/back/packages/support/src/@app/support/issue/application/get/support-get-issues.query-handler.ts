import { StorageAccountSharedAccessSignatureService } from '@app/storage-account/shared-access-signature';
import {
    SupportGetIssuesQuery,
    SupportIssue,
    SupportIssueMapper,
    SupportIssueResponse,
} from '@app/support/issue';
import { SupportGetIssuesService } from '@app/support/issue/application/get/support-get-issues.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(SupportGetIssuesQuery)
export class SupportGetIssuesQueryHandler
    implements IQueryHandler<SupportGetIssuesQuery>
{
    private readonly mapper: SupportIssueMapper = new SupportIssueMapper();

    constructor(
        private readonly getIssuesService: SupportGetIssuesService,
        private readonly storageAccountSharedAccessSignatureService: StorageAccountSharedAccessSignatureService,
    ) {}

    async execute(
        query: SupportGetIssuesQuery,
    ): Promise<SupportIssueResponse[] | LiteralObject[]> {
        const models = await this.getIssuesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(
            models as SupportIssue[],
            this.storageAccountSharedAccessSignatureService,
        );
    }
}
