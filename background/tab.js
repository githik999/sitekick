browser.tabs.onUpdated.addListener(onUpdate)

function onUpdate(id, info, tab) {
    if( info.status == 'complete' ) {
        onLoadComplete(id)
    }
}

function onLoadComplete(id) {
    const ip = get_tab_ip(id)
    if( ip == '0.0.0.0' ) {
        browser.pageAction.setTitle({tabId: id,title: SOCKS5_IP+':'+SOCKS5_PORT})
        browser.pageAction.setIcon({tabId: id, path: 'image/logo.png'})
    } else {
        browser.pageAction.setTitle({tabId: id,title: ip})
        browser.pageAction.setIcon({tabId: id, path: 'image/china.png'})
    }
    browser.pageAction.show(id)
}

  