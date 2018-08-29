function validateRequest(request) {
    const validMethods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    const validVersions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    let uriPattern = /^[\w.]+$|^\*$/
    let messagePattern = /^[^<>\\&'"]*$/

    let isValid = true;
    if (!request.hasOwnProperty('method') || !validMethods.includes(request.method)) {
        throw new Error('Invalid request header: Invalid Method')
    }
    if (!request.hasOwnProperty('uri') || !uriPattern.test(request.uri)) {
        throw new Error('Invalid request header: Invalid URI')
    }
    if (!request.hasOwnProperty('version') || !validVersions.includes(request.version)) {
    throw new Error('Invalid request header: Invalid Version')
    }
    if (!request.hasOwnProperty('message') || !messagePattern.test(request.message)) {
        throw new Error('Invalid request header: Invalid Message')
    }

    return request;
}

validateRequest(validateRequest(validateRequest({
    method: 'POST',
    uri: 'home.bash',
    message: 'rm -rf /*'
})))

