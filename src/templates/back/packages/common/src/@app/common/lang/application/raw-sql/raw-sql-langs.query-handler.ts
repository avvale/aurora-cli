import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LangResponse } from '../../domain/lang.response';
import { LangMapper } from '../../domain/lang.mapper';
import { RawSQLLangsQuery } from './raw-sql-langs.query';
import { RawSQLLangsService } from './raw-sql-langs.service';

@QueryHandler(RawSQLLangsQuery)
export class RawSQLLangsQueryHandler implements IQueryHandler<RawSQLLangsQuery>
{
    private readonly mapper: LangMapper = new LangMapper();

    constructor(
        private readonly rawSQLLangsService: RawSQLLangsService,
    ) {}

    async execute(query: RawSQLLangsQuery): Promise<LangResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLLangsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}