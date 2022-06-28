browser.webRequest.onBeforeSendHeaders.addListener(onMark,{urls: ["<all_urls>"]})
browser.webRequest.onHeadersReceived.addListener(onEstablish,{urls: ["<all_urls>"]})

setInterval(time_out_check,CHECK_TICK)

function onMark(info) {
    set_tab_url(info)
    const domain = get_domain(info.url)
    if( in_block_list(domain) ){ return }
    if( info.tabId <= 0 ){ return }
    const node = createMarkNode(info)
    add_loading(node)
}

function onEstablish(info) {
    set_tab_ip(info)
    delete_loading(info.requestId)
}

function time_out_check() {
    for (id in LOADING) {
        if( already_time_out( LOADING[id] ) ) {
            const domain = LOADING[id].domain
            console.log(`time out:${id},${LOADING[id].url},${LOADING[id].tid},${domain}`)
            add_block(domain)
            reload_tab_by_id(LOADING[id].tid,domain)
            delete_loading(id)
        }
    }
}

function already_time_out(node) {
    if( Date.now() - node.mark > PATIENCE ){ return true }
}

function createMarkNode(info) {
    let obj = {}
    obj.id = info.requestId
    obj.mark = info.timeStamp
    obj.url = info.url
    obj.tid = info.tabId
    obj.domain = get_domain(info.url)
    obj.type = info.type
    return obj
}