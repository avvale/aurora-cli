export const encrypt = async (message, algorithm: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512' = 'SHA-256'): Promise<string> =>
{
    if (!crypto.subtle)
    {
        console.warn(`SubtleCrypto API not supported.
You may be losing functionality in your application by not being able to create hashes with strings.
To access the SubtleCrypto API, you need to run your application under the secure context of a web server (HTTPS).

Go to https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto for more information.
`);
        return '';
    }

    const msgUint8 = new TextEncoder().encode(message);
    // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
    // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2,'0')).join('');

    return hashHex;
};
