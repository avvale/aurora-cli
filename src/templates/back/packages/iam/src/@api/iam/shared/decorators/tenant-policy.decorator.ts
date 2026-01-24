/* eslint-disable max-len */
import { IamAccountResponse } from '@app/iam/account';
import { Arr } from '@aurorajs.dev/core';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

// checks that the tenantId field is present in the received payloads
// and that the value of tenantId sent, the user has access to that tenant
export const TenantPolicy = ({
  targetProperty = 'tenantIds',
  payloadIndex = 1,
  isArray = true,
}: {
  targetProperty?: string; // name of the property containing the tenantId in the payload
  payloadIndex?: number; // index of the payload in the arguments
  isArray?: boolean; // if the column is an array
} = {}) => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    return {
      value(...args: any[]) {
        const { payload } = normalizePayload(args[payloadIndex]);

        // get account from arguments
        let account: IamAccountResponse;
        for (const arg of args) {
          if (
            typeof arg === 'object' &&
            arg.constructor.name === 'IamAccountResponse'
          )
            account = <IamAccountResponse>arg;
        }

        if (!account)
          throw new BadRequestException(
            'To use @TenantPolicy() decorator need has @CurrentAccount() defined in properties of method',
          );

        // check if payload has tenantId in array payload
        if (Array.isArray(payload)) {
          for (const item of payload) {
            if (!item[targetProperty])
              throw new BadRequestException(
                `The ${targetProperty} property not found in payload, maybe has to set payloadIndex or targetProperty arguments of TenantPolicy decorator`,
              );
            if (isArray) {
              if (!Arr.contained(item[targetProperty], account.dTenants))
                throw new UnauthorizedException({
                  statusCode: 401,
                  message:
                    'Not allowed operate this item on select tenants, please contact the administrator.',
                  translation: 'error.107',
                  params: {
                    tenant: payload[targetProperty],
                  },
                });
            } else {
              if (account.dTenants.indexOf(item[targetProperty]) === -1)
                throw new UnauthorizedException({
                  statusCode: 401,
                  message:
                    'Not allowed operate this item on select tenants, please contact the administrator.',
                  translation: 'error.107',
                  params: {
                    tenant: payload[targetProperty],
                  },
                });
            }
          }
        }
        // check if payload has tenantId in object payload
        else {
          if (!payload[targetProperty])
            throw new BadRequestException(
              `The ${targetProperty} property not found in payload, maybe has to set payloadIndex or targetProperty arguments of TenantPolicy decorator`,
            );
          if (isArray) {
            if (!Arr.contained(payload[targetProperty], account.dTenants))
              throw new UnauthorizedException({
                statusCode: 401,
                message:
                  'Not allowed operate this item on select tenants, please contact the administrator.',
                translation: 'error.107',
                params: {
                  tenant: payload[targetProperty],
                },
              });
          } else {
            if (account.dTenants.indexOf(payload[targetProperty]) === -1)
              throw new UnauthorizedException({
                statusCode: 401,
                message:
                  'Not allowed operate this item on select tenants, please contact the administrator.',
                translation: 'error.107',
                params: {
                  tenant: payload[targetProperty],
                },
              });
          }
        }

        // default behavior, apply 'this' to use current class definition, with inject apply
        const result = descriptor.value.apply(this, args);
        return result;
      },
    };
  };
};

function normalizePayload(rawPayload: any): {
  payload: any;
  fromMultipart: boolean;
} {
  if (typeof rawPayload === 'string') {
    try {
      return { payload: JSON.parse(rawPayload), fromMultipart: true };
    } catch {
      throw new BadRequestException(
        'To use @TenantPolicy() decorator need valid JSON string received in multipart/form-data payload.',
      );
    }
  }

  return { payload: rawPayload, fromMultipart: false };
}
