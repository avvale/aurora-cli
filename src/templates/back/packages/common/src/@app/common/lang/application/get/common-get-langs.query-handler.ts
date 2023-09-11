import { CommonGetLangsQuery, CommonLangMapper, CommonLangResponse } from '@app/common/lang';
import { CommonGetLangsService } from '@app/common/lang/application/get/common-get-langs.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonGetLangsQuery)
export class CommonGetLangsQueryHandler implements IQueryHandler<CommonGetLangsQuery>
{
    private readonly mapper: CommonLangMapper = new CommonLangMapper();

    constructor(
        private readonly getLangsService: CommonGetLangsService,
    ) {}

    async execute(query: CommonGetLangsQuery): Promise<CommonLangResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getLangsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
