export function parseKey(key: PublicKeyCredential) {
    const decoder = new TextDecoder('utf-8');
    const decoded = decoder.decode(key.response.clientDataJSON);
    const parsed = JSON.parse(decoded);
    console.log(decoded);
}