
function reload_tab_by_id(id,domain) {
    if( !in_block_list(domain) ) { return }
    if( reload_before(domain) ) { return }
    console.log('reload_tab_by_id',id,domain)
    add_reload(domain)
    browser.tabs.get(id).then(onTabInfo,onError)
}

function onTabInfo(info) {
    const id = info.id
    if( info.url == 'about:newtab' ) {
        const url = get_tab_url(id)
        browser.tabs.update(id,{url: url}).then(onUpdated, onError)
    } else {
        browser.tabs.reload(id).then(onUpdated, onError)
    }
}

function onUpdated(tab) {
    
}
  
function onError(error) {
    console.log(`Error: ${error}`)
}