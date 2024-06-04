import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { v4 as uuidv4 } from 'uuid';
import { base64ToBlob } from './base64-to-blob.function';

// dayjs configuration
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

export class Utils
{
    static now(): dayjs.Dayjs
    {
        return dayjs();
    }

    static nowTimestamp(): string
    {
        return dayjs().format('YYYY-MM-DD H:mm:ss');
    }

    static nowDate(): string
    {
        return dayjs().format('YYYY-MM-DD');
    }

    static dateFromFormat(date: string, format: string = 'YYYY-MM-DD H:mm:ss'): dayjs.Dayjs
    {
        return dayjs(date, format);
    }

    static timezone(): string
    {
        return dayjs.tz.guess();
    }

    static uuid(): string
    {
        return uuidv4();
    }

    static removeSpecialCharacters(str: string): string
    {
        // https://ricardometring.com/javascript-replace-special-characters
        return str.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
    }

    static wait(time: number): Promise<void>
    {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    /**
     * Remove all specified keys from an object, no matter how deep they are.
     * The removal is done in place, so run it on a copy if you don't want to modify the original object.
     * This function has no limit so circular objects will probably crash the browser
     *
     * @param obj The object from where you want to remove the keys
     * @param keys An array of property names (strings) to remove
     */
    static removeKeys(obj: any, keys: string[]): void
    {
        let index;
        for (const prop in obj)
        {
            // important check that this is objects own property
            // not from prototype prop inherited
            if (obj.hasOwnProperty(prop))
            {
                switch(typeof(obj[prop]))
                {
                    case 'string':
                        index = keys.indexOf(prop);
                        if (index > -1) delete obj[prop];
                        break;

                    case 'object':
                        index = keys.indexOf(prop);
                        if(index > -1)
                        {
                            delete obj[prop];
                        }
                        else
                        {
                            Utils.removeKeys(obj[prop], keys);
                        }
                        break;
                }
            }
        }
    }

    /**
     * map FormControl to apply function
     *
     * @param abstractControl
     * @param fn
     * @param path
     */
    static deepMapFormControl(abstractControl: AbstractControl, fn: Function, path: string): void
    {
        if (abstractControl instanceof FormArray)
        {
            abstractControl.controls.map((val, index) => Utils.deepMapFormControl(val, fn, `${path}[${index}]`));
        }
        else if (abstractControl instanceof FormGroup)
        {
            for (const index in abstractControl.controls)
            {
                Utils.deepMapFormControl(abstractControl.get(index), fn, path ? path + '.' + index: index);
            }
        }
        else if (abstractControl instanceof FormControl)
        {
            fn(path, abstractControl);
        }
    }

    // TODO, add types for mimeType
    static downloadFile(content: any, fileName: string, mimeType: string): void
    {
        const a = document.createElement('a');
        mimeType = mimeType || 'application/octet-stream';

        if (URL && 'download' in a)
        {
            a.href = URL.createObjectURL(
                new Blob([content],
                    {
                        type: mimeType,
                    },
                ),
            );
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        else
        {
            location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
        }
    }

    static convertBase64ToBlob(
        b64Data: string,
        contentType: string = '',
        sliceSize: number = 512,
    ): Blob
    {
        return base64ToBlob(
            b64Data,
            contentType,
            sliceSize,
        );
    }
}