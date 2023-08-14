import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonLangResponse } from '../../domain/common-lang.response';
import { CommonLangMapper } from '../../domain/common-lang.mapper';
import { CommonFindLangQuery } from './common-find-lang.query';
import { CommonFindLangService } from './common-find-lang.service';

@QueryHandler(CommonFindLangQuery)
export class CommonFindLangQueryHandler implements IQueryHandler<CommonFindLangQuery>
{
    private readonly mapper: CommonLangMapper = new CommonLangMapper();

    constructor(
        private readonly findLangService: CommonFindLangService,
    ) {}

    async execute(query: CommonFindLangQuery): Promise<CommonLangResponse>
    {
        const lang = await this.findLangService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(lang);
    }
}
