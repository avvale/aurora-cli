import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommonLangResponse } from '../../domain/common-lang.response';
import { CommonLangMapper } from '../../domain/common-lang.mapper';
import { CommonGetLangsQuery } from './common-get-langs.query';
import { CommonGetLangsService } from './common-get-langs.service';

@QueryHandler(CommonGetLangsQuery)
export class CommonGetLangsQueryHandler implements IQueryHandler<CommonGetLangsQuery>
{
    private readonly mapper: CommonLangMapper = new CommonLangMapper();

    constructor(
        private readonly getLangsService: CommonGetLangsService,
    ) {}

    async execute(query: CommonGetLangsQuery): Promise<CommonLangResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getLangsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        ));
    }
}