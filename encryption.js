const crypto = require('crypto');
const hash = crypto.createHash('md5');

function createHashKey(password) {
    /*
     * Hash the password entered by the user.
     *
     * :param password: password
     * :param type: str
     *
     * :return: encrypted password
     * :rtype: str
     */
    hash.update(password);
    return hash.digest('hex');
}

function createHmacKey(userKey, userData) {
    /*
     * Hmac encryption.
     *
     * :param userKey: User-entered key
     * :param type: str
     *
     * :param userData: stitched strings
     * :param type: str
     *
     * :return: encrypted password
     * :rtype: str
     */
    const hmac = crypto.createHmac('sha256', userKey);
    hmac.update(userData)
        .update(userKey);
    return hmac.digest('hex');
}

function createSecret(domain, salt, length) {
    /*
     * Just encryption ...
     *
     * :param domain: domain name
     * :param type: str
     *
     * :param salt: password
     * :param type: str
     *
     * :param length: length of password
     * :param type: int
     *
     * :return: encrypted password
     * :rtype: str
     */
    if (!domain || !salt || length <= 2) {
        return ''
    }
    var userKey = createHashKey(salt);
    const ret = Array.apply(null, {
            length: 3
        })
        .reduce(value => createHmacKey(value + userKey, domain), domain)
        .substr(0, length)
        .split('')
    ret[0] = isNaN(ret[0]) ? ret[0].toUpperCase() : String.fromCharCode(65 + parseInt(ret[0], 10))
    ret[1] = isNaN(ret[1]) ? ret[1].toLowerCase() : String.fromCharCode(97 + parseInt(ret[1], 10))
    ret[2] = isNaN(ret[2]) ? ret[2].charCodeAt(0) % 10 : ret[2]
    return ret.join('')
}

module.exports = createSecret;
