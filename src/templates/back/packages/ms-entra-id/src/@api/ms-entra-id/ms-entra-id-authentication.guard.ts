import { getRequestFromExecutionContext } from '@aurorajs.dev/core';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MsEntraIdAuthenticationGuard extends AuthGuard('MsEntraId') {
  // override the getRequest() method for return request from graphql or rest api.
  getRequest(context: ExecutionContext): Request {
    return getRequestFromExecutionContext(context);
  }
}
