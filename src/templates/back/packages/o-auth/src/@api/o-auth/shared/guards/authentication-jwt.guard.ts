import { getRequestFromExecutionContext } from '@aurorajs.dev/core';
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticationJwtGuard extends AuthGuard('jwt') {
    // override the getRequest() method for return request from graphql or rest api.
    getRequest<Request>(context: ExecutionContext): Request {
        return getRequestFromExecutionContext(context);
    }

    // Account returned by jwt.strategy in validate method (JwtStrategy)
    handleRequest<AccountResponse>(err, user, info): AccountResponse {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user)
            throw (
                err ||
                new UnauthorizedException({
                    statusCode: 401,
                    message: 'OAuthAccessToken not allowed',
                })
            );
        return user;
    }
}
