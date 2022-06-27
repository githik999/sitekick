var vip = {}
var loading = {}
browser.webRequest.onBeforeSendHeaders.addListener(logInit,{urls: ["<all_urls>"]})
browser.webRequest.onHeadersReceived.addListener(logEstablish,{urls: ["<all_urls>"]},["responseHeaders"])
browser.proxy.onRequest.addListener(proxyRequest, {urls: ["<all_urls>"]})

setInterval(check,300)

function check() {
    const now = Date.now()
    for (id in loading) {
        const mark = loading[id].mark
        const domain = loading[id].domain
        const gap = now - mark
        if (gap > 1000) {
            vip[domain] = true
            delete loading[id]
        }
    }
}

function logInit(info) {
    const domain = get_domain(info.url)
    if ( fang(domain) ) { return }
    let obj = {}
    obj.mark = info.timeStamp
    obj.domain = domain
    loading[info.requestId] = obj
}

function logEstablish(info) {
    const domain = get_domain(info.url)
    if ( fang(domain) ) { return }
    delete loading[info.requestId]
}

function shouldProxy(domain) {
    if ( fang(domain) ) { return true }
    return vip[domain]
}

function proxyRequest(info) {
    let domain = get_domain(info.url)
    if( shouldProxy(domain) ) {
        return {proxyDNS:true, type: "socks", host: "127.0.0.1", port: 1080}
    }
    return {type: "direct"}
}

function fang(domain) {
    if( domain.indexOf('facebook') != -1 ){ return true }
    if( domain.indexOf('google') != -1 ){ return true }
    if( domain.indexOf('youtube') != -1 ){ return true }
    if( domain.indexOf('twitter') != -1 ){ return true }
}

function get_domain(url) {
    return new URL(url).hostname
}