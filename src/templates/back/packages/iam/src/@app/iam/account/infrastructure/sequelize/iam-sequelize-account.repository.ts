import {
    IamAccount,
    IamAccountMapper,
    IamAccountModel,
    IamIAccountRepository,
} from '@app/iam/account';
import {
    AuditingRunner,
    ICriteria,
    LiteralObject,
    SequelizeRepository,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class IamSequelizeAccountRepository
    extends SequelizeRepository<IamAccount, IamAccountModel>
    implements IamIAccountRepository
{
    public readonly aggregateName: string = 'IamAccount';
    public readonly mapper: IamAccountMapper = new IamAccountMapper();

    constructor(
        @InjectModel(IamAccountModel)
        public readonly repository: typeof IamAccountModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    ) {
        super();
    }

    // hook called after create aggregate
    async createdAggregateHook(
        aggregate: IamAccount,
        model: IamAccountModel,
        createOptions: LiteralObject,
    ): Promise<void> {
        // add many to many relation
        if (aggregate?.roleIds.length > 0) {
            try {
                await model.$add(
                    'roles',
                    aggregate.roleIds.value,
                    createOptions,
                );
            } catch (error) {
                console.error('[Error] SequelizeRepository:', error);
            }
        }
        if (aggregate?.tenantIds.length > 0) {
            try {
                await model.$add(
                    'tenants',
                    aggregate.tenantIds.value,
                    createOptions,
                );
            } catch (error) {
                console.error('[Error] SequelizeRepository:', error);
            }
        }
    }

    // hook called after create aggregate
    async updatedByIdAggregateHook(
        aggregate: IamAccount,
        model: IamAccountModel,
        updateByIdOptions: LiteralObject,
    ): Promise<void> {
        // set many to many relation
        if (aggregate?.roleIds.isArray()) {
            try {
                await model.$set(
                    'roles',
                    aggregate.roleIds.value,
                    updateByIdOptions,
                );
            } catch (error) {
                console.error('[Error] SequelizeRepository:', error);
            }
        }
        if (aggregate?.tenantIds.isArray()) {
            try {
                await model.$set(
                    'tenants',
                    aggregate.tenantIds.value,
                    updateByIdOptions,
                );
            } catch (error) {
                console.error('[Error] SequelizeRepository:', error);
            }
        }
    }
}
