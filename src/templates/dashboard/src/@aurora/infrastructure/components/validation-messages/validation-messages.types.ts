import { Observable } from 'rxjs';

/**
 * custom message
 */
export interface CustomMessage
{
    validatorName: string;
    message: Observable<string> | (() => Observable<string>);
    translateable: boolean;
    translateProperties: {
        [key:string]: string;
    };
}

/**
 * Object that contain error message
 */
export interface FormMessageErrors
{
    [key: string]: Observable<string>;
}

/**
 * options to send across validate$ observable in validation messages service
 */
export interface ValidateOptions
{
    force: boolean;
}