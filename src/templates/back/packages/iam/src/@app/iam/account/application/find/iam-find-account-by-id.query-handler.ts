import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamAccountResponse } from '../../domain/iam-account.response';
import { IamAccountMapper } from '../../domain/iam-account.mapper';
import { IamAccountId } from '../../domain/value-objects';
import { IamFindAccountByIdQuery } from './iam-find-account-by-id.query';
import { IamFindAccountByIdService } from './iam-find-account-by-id.service';

@QueryHandler(IamFindAccountByIdQuery)
export class IamFindAccountByIdQueryHandler implements IQueryHandler<IamFindAccountByIdQuery>
{
    private readonly mapper: IamAccountMapper = new IamAccountMapper();

    constructor(
        private readonly findAccountByIdService: IamFindAccountByIdService,
    ) {}

    async execute(query: IamFindAccountByIdQuery): Promise<IamAccountResponse>
    {
        const account = await this.findAccountByIdService.main(
            new IamAccountId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(account);
    }
}
