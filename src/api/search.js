import {axiosRequest} from './index.js'
import {host, searchIpAddress} from './host.js'

export function hotsearch(){
	const url = host + '/search/hot'
	return axiosRequest(url)
}

export function singerurl(keywords){
	const url = host + `/search/suggest?keywords=${keywords}`
	return axiosRequest(url)
}

export function songlisturl(keywords,offset){
	const url = '/searchApi' + `/search?keywords=${keywords}` + `&offset=${offset}`
	return axiosRequest(url)
}
