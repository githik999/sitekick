browser.proxy.onRequest.addListener(onRequest, {urls: ["<all_urls>"]})

function onRequest(info) {
    const domain = get_domain(info.url)
    if( in_block_list(domain) ) {
        return {proxyDNS:true, type: "socks", host: SOCKS5_IP, port: SOCKS5_PORT}
    }
    return {type: "direct"}
}