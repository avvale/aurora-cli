import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonLangResponse } from '../../domain/common-lang.response';
import { CommonLangMapper } from '../../domain/common-lang.mapper';
import { CommonLangId } from '../../domain/value-objects';
import { CommonFindLangByIdQuery } from './common-find-lang-by-id.query';
import { CommonFindLangByIdService } from './common-find-lang-by-id.service';

@QueryHandler(CommonFindLangByIdQuery)
export class CommonFindLangByIdQueryHandler implements IQueryHandler<CommonFindLangByIdQuery>
{
    private readonly mapper: CommonLangMapper = new CommonLangMapper();

    constructor(
        private readonly findLangByIdService: CommonFindLangByIdService,
    ) {}

    async execute(query: CommonFindLangByIdQuery): Promise<CommonLangResponse>
    {
        const lang = await this.findLangByIdService.main(
            new CommonLangId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(lang);
    }
}