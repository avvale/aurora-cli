import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LangResponse } from '../../domain/lang.response';
import { LangMapper } from '../../domain/lang.mapper';
import { FindLangQuery } from './find-lang.query';
import { FindLangService } from './find-lang.service';

@QueryHandler(FindLangQuery)
export class FindLangQueryHandler implements IQueryHandler<FindLangQuery>
{
    private readonly mapper: LangMapper = new LangMapper();

    constructor(
        private readonly findLangService: FindLangService,
    ) {}

    async execute(query: FindLangQuery): Promise<LangResponse>
    {
        const lang = await this.findLangService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(lang);
    }
}