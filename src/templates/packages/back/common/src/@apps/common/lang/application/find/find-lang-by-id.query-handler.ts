import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LangResponse } from '../../domain/lang.response';
import { LangMapper } from '../../domain/lang.mapper';
import { LangId } from '../../domain/value-objects';
import { FindLangByIdQuery } from './find-lang-by-id.query';
import { FindLangByIdService } from './find-lang-by-id.service';

@QueryHandler(FindLangByIdQuery)
export class FindLangByIdQueryHandler implements IQueryHandler<FindLangByIdQuery>
{
    private readonly mapper: LangMapper = new LangMapper();

    constructor(
        private readonly findLangByIdService: FindLangByIdService,
    ) {}

    async execute(query: FindLangByIdQuery): Promise<LangResponse>
    {
        const lang = await this.findLangByIdService.main(
            new LangId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(lang);
    }
}