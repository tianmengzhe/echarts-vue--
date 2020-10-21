import { request, requestMap } from './request'


export const getSeller = () => request('seller')

export const getTrend = () => request('trend')

export const getMapJSON = name => requestMap(name)

export const getMap = () => request('map')