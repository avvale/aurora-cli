import { AuditingHttpCommunicationEvent } from '@api/graphql';
import { AuditingCreateHttpCommunicationCommand, AuditingUpdateHttpCommunicationByIdCommand } from '@app/auditing/http-communication';
import { ICommandBus, Utils } from '@aurorajs.dev/core';
import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// logging.axios-interceptor.ts
const META_KEY = Symbol('metaAxiosInterceptor');

// Merging our custom properties with the base config
interface MetaAxiosRequestConfig extends InternalAxiosRequestConfig
{
    [META_KEY]: {
        id: string;
        tags: string[] | number[];
    };
}

@Injectable()
export class AuditingAxiosInterceptorService implements OnModuleInit
{
    constructor(
        private readonly httpService: HttpService,
        private readonly commandBus: ICommandBus,
    ) {}

    onModuleInit(): void
    {
        this.registerInterceptors();
    }

    private registerInterceptors(): void
    {
        const { axiosRef: axios } = this.httpService;

        axios.interceptors.request.use(
            this.requestFulfilled(),
            this.requestRejected(),
        );

        axios.interceptors.response.use(
            this.responseFulfilled(),
            this.responseRejected(),
        );
    }

    protected isAxiosError(err: any): boolean
    {
        return !!(err.isAxiosError && err.isAxiosError === true);
    }

    requestFulfilled()
    {
        return async (config: MetaAxiosRequestConfig) =>
        {
            // set uuid to update response
            config[META_KEY] = {
                id  : Utils.uuid(),
                tags: config.headers['X-Auditing-Tags'] ? config.headers['X-Auditing-Tags'].split(',') : [],
            };

            await this.commandBus.dispatch(new AuditingCreateHttpCommunicationCommand(
                {
                    ...config[META_KEY],
                    event         : AuditingHttpCommunicationEvent.REQUEST_FULFILLED,
                    method        : config.method,
                    url           : config.url,
                    isReprocessing: false,
                    httpRequest   : {
                        auth               : config.auth,
                        baseUrl            : config.baseURL,
                        data               : config.data,
                        decompress         : config.decompress,
                        headers            : config.headers,
                        httpAgent          : config.httpAgent,
                        httpsAgent         : config.httpsAgent,
                        insecureHTTPParser : config.insecureHTTPParser,
                        maxBodyLength      : config.maxBodyLength,
                        maxContentLength   : config.maxContentLength,
                        maxRedirects       : config.maxRedirects,
                        method             : config.method,
                        params             : config.params,
                        proxy              : config.proxy,
                        responseEncoding   : config.responseEncoding,
                        responseType       : config.responseType,
                        socketPath         : config.socketPath,
                        timeout            : config.timeout,
                        timeoutErrorMessage: config.timeoutErrorMessage,
                        transitional       : config.transitional,
                        url                : config.url,
                        withCredentials    : config.withCredentials,
                        xsrfCookieName     : config.xsrfCookieName,
                        xsrfHeaderName     : config.xsrfHeaderName,
                    },
                },
                {},
            ));

            return config;
        };
    }

    requestRejected(): (error: any) => any
    {
        return async err =>
        {
            if (this.isAxiosError(err))
            {
                const { config, response } = err;

                await this.commandBus.dispatch(new AuditingUpdateHttpCommunicationByIdCommand(
                    {
                        id                 : config[META_KEY].id,
                        event              : AuditingHttpCommunicationEvent.REQUEST_REJECTED,
                        status             : response.status,
                        httpRequestRejected: {
                            data      : response.data,
                            headers   : response.headers,
                            status    : response.status,
                            statusText: response.statusText,
                        },
                    },
                    {},
                    {},
                ));
            }
            else
            {
                console.error('Unexpected generic error', err);
            }

            throw err;
        };
    }

    responseFulfilled()
    {
        return async (response: AxiosResponse) =>
        {
            await this.commandBus.dispatch(new AuditingUpdateHttpCommunicationByIdCommand(
                {
                    id          : response.config[META_KEY].id,
                    event       : AuditingHttpCommunicationEvent.RESPONSE_FULFILLED,
                    status      : response.status,
                    httpResponse: {
                        data      : response.data,
                        headers   : response.headers,
                        status    : response.status,
                        statusText: response.statusText,
                    },
                },
                {},
                {},
            ));

            return response;
        };
    }

    responseRejected(): (error: any) => any
    {
        return async err =>
        {
            if (this.isAxiosError(err))
            {
                const { config, response } = err;

                await this.commandBus.dispatch(new AuditingUpdateHttpCommunicationByIdCommand(
                    {
                        id                  : config[META_KEY].id,
                        event               : AuditingHttpCommunicationEvent.RESPONSE_REJECTED,
                        status              : response?.status,
                        httpResponseRejected: {
                            data      : response?.data,
                            headers   : response?.headers,
                            status    : response?.status,
                            statusText: response?.statusText,
                        },
                    },
                    {},
                    {},
                ));
            }
            else
            {
                console.error('Unexpected generic error', err);
            }

            throw err;
        };
    }
}