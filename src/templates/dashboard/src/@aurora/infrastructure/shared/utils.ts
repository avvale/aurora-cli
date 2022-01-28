import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

export class Utils
{
    static uuid(): string
    {
        return uuidv4();
    }

    /**
     * Remove all specified keys from an object, no matter how deep they are.
     * The removal is done in place, so run it on a copy if you don't want to modify the original object.
     * This function has no limit so circular objects will probably crash the browser
     *
     * @param obj The object from where you want to remove the keys
     * @param keys An array of property names (strings) to remove
     */
    static removeKeys(obj: any, keys: string[])
    {
        var index;
        for (var prop in obj)
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
    static deepMapFormControl(abstractControl: AbstractControl, fn: Function, path: string)
    {
        if (abstractControl instanceof FormArray)
        {
            abstractControl.controls.map((val, index) => Utils.deepMapFormControl(val, fn, `${path}[${index}]`))
        }
        else if (abstractControl instanceof FormGroup)
        {
            for (const index in abstractControl.controls)
            {
                Utils.deepMapFormControl(abstractControl.get(index), fn, path ? path + '.' + index: index)
            }
        }
        else if (abstractControl instanceof FormControl)
        {
            fn(path, abstractControl);
        }
    }
}