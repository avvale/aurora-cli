import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonLangResponse } from '../../domain/common-lang.response';
import { CommonLangMapper } from '../../domain/common-lang.mapper';
import { CommonRawSQLLangsQuery } from './common-raw-sql-langs.query';
import { CommonRawSQLLangsService } from './common-raw-sql-langs.service';

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