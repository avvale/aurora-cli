import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuditingMeta } from '@api/auditing/auditing.types';

// normally user is implements for @app/o-auth/shared/strategies/jwt.strategy.ts in validate method
export const Auditing = createParamDecorator(
    (
        data: {
            accountContainer: string;
        } = {
            accountContainer: 'user',
        },
        context: ExecutionContext,
    ): AuditingMeta =>
    {
        let request;

        if (context['contextType'] === 'graphql')
        {
            const ctx = GqlExecutionContext.create(context);
            request = ctx.getContext().req;
        }
        else if (context['contextType'] === 'http')
        {
            request = context.switchToHttp().getRequest();
        }

        return {
            ip       : request.ip,
            method   : request.method,
            baseUrl  : request.baseUrl,
            userAgent: request.get('user-agent'),
            params   : request.params,
            query    : request.query,
            body     : request.body,
            account  : request[data.accountContainer],
        };
    },
);