/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
declare interface String
{
    toPascalCase(this: string): string;
}

declare module _
{
    interface LoDashStatic
    {
        pascalCase(value: string): string;
    }
}

// interface declared separate from your implementation to avoid error
// https://stackoverflow.com/questions/28779632/how-to-extend-string-prototype-when-importing-modules