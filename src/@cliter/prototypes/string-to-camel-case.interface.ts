declare interface String
{
    toCamelCase(this: string): string;
}

// interface declared separate from your implementation to avoid error
// https://stackoverflow.com/questions/28779632/how-to-extend-string-prototype-when-importing-modules