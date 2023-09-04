import { CommonLangMapper, CommonLangResponse, CommonRawSQLLangsQuery } from '@app/common/lang';
import { CommonRawSQLLangsService } from '@app/common/lang/application/raw-sql/common-raw-sql-langs.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(CommonRawSQLLangsQuery)
export class CommonRawSQLLangsQueryHandler implements IQueryHandler<CommonRawSQLLangsQuery>
{
    private readonly mapper: CommonLangMapper = new CommonLangMapper();

    constructor(
        private readonly rawSQLLangsService: CommonRawSQLLangsService,
    ) {}

    async execute(query: CommonRawSQLLangsQuery): Promise<CommonLangResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLLangsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
