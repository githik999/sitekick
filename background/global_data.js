var BLOCK = {}
var TAB_IP = {}
var TAB_URL = {}
var RELOAD = {}
var LOADING = {}


//BLOCK
function insideDomain(keyword) {
    return domain.includes(val)
}

function in_block_list(domain) {
    const hit = (keyword) => domain.includes(keyword)
    if( BLACK_DOMAIN_KEYWORD.some(hit) ) { return true }
    if( BLOCK[domain] ) { return true }
}

function add_block(domain) {
    if( domain.endsWith('.cn') ) { return }
    if( BLOCK[domain] ) { return }
    BLOCK[domain] = true
    console.log(`add to block list[${domain}]`)
}

//TAB_IP
function set_tab_ip(info) {
    if( info.type != 'main_frame' ){ return }
    TAB_IP[info.tabId] = info.ip
    //console.log('set_tab_ip',info.tabId,info.ip)
}

function get_tab_ip(id) {
    return TAB_IP[id]
}

//TAB_URL
function set_tab_url(info) {
    if( info.type != 'main_frame' ){ return }
    TAB_URL[info.tabId] = info.url
    console.log('set_tab_url',info.tabId,info.url)
}

function get_tab_url(id) {
    return TAB_URL[id]
}

//RELOAD
function add_reload(domain) {
    RELOAD[domain] = true
}

function reload_before(domain) {
    if( RELOAD[domain] ) { return true }
}

//LOADING
function add_loading(node) {
    if( LOADING[node.id] ){ return }
    LOADING[node.id] = node
    //console.log(`add to loading list[${node.id},${node.url},${node.mark}]`)
}

function delete_loading(id) {
    if( LOADING[id] ) {
        delete LOADING[id]
        //console.log(`delete from loading list[${id}]`)
    }
}

