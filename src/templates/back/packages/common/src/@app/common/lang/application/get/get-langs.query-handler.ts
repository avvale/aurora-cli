import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LangResponse } from '../../domain/lang.response';
import { LangMapper } from '../../domain/lang.mapper';
import { GetLangsQuery } from './get-langs.query';
import { GetLangsService } from './get-langs.service';

@QueryHandler(GetLangsQuery)
export class GetLangsQueryHandler implements IQueryHandler<GetLangsQuery>
{
    private readonly mapper: LangMapper = new LangMapper();

    constructor(
        private readonly getLangsService: GetLangsService,
    ) {}

    async execute(query: GetLangsQuery): Promise<LangResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getLangsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}