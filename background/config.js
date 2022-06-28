const SOCKS5_IP = '127.0.0.1'
const SOCKS5_PORT = '1080'

const PATIENCE = 2000
//after 2s still not completed consider slow.shall add to block list
const CHECK_TICK = 100
//every 0.1s check time out



var BLACK_DOMAIN_KEYWORD = ['google','youtube','facebook','twimg','twitter','reddit','redd.it','v2ex']