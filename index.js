import qs from 'querystring'
import { getCookie, setCookie, postJSON, uuid, eventify } from './lib/utils'

function initCookieData() {
  let query = qs.parse(location.search.slice(1)) || {}
  const cSource = getCookie('utm_source')
  const cMedium = getCookie('utm_medium')
  const cCampaign = getCookie('utm_campaign')
  const cgclid = getCookie('gclid')
  let utm_source = query.utm_source || cSource
  let utm_medium = query.utm_medium || cMedium
  const utm_campaign = query.utm_campaign || cCampaign
  const gclid = query.gclid || cgclid
  if (gclid && !utm_source && !utm_medium) {
    utm_source = 'google'
    utm_medium = 'cpc'
  }
  if (utm_source) setCookie('utm_source', utm_source, 30)
  if (utm_medium) setCookie('utm_medium', utm_medium, 30)
  if (utm_campaign) setCookie('utm_campaign', utm_campaign, 30)
  if (gclid) setCookie('gclid', gclid, 30)

  let clientId = getCookie('__cfje_cid')
  let sessionId = getCookie('__cfje_sid')
  const isChangeChannel = cSource != utm_source || cMedium != utm_medium || cCampaign != utm_campaign || cgclid != gclid

  if (!clientId) {
    clientId = uuid()
  }
  if (!sessionId || isChangeChannel) {
    sessionId = uuid()
  }
  setCookie('__cfje_cid', clientId, 60 * 24 * 90) // 90 days
  setCookie('__cfje_sid', sessionId, 30) // 30 mins
  return { clientId, sessionId, query }
}

window.cfjDataLayer = window.cfjDataLayer || []

class EventCollector {
  constructor(layers) {
    let data = initCookieData()
    data.apiVersion = process.env.API_VERSION
    data.encoding = document.characterSet
    data.language = navigator.language || navigator.userLanguage

    data.pageURL = window.location.href
    data.pageTitle = document.title
    data.referrer = this.referrer || document.referrer
    EventCollector.prototype.referrer = window.location.href // For SPA

    data.screenResolution = window.screen.availHeight + 'x' + window.screen.availWidth
    data.viewportSize = window.innerWidth + 'x' + window.innerHeight
    data.pageTitle = document.title

    data.query = qs.parse(location.search.slice(1))

    this.data = {
      ...data
    }

    for (const layer of layers) {
      this.data = {
        ...this.data,
        ...layer
      }
    }
  }

  sendEvent() {
    return postJSON(window.cfjEndponit, this.data)
  }
}

;(function emitEvents() {
  for (let index = 0; index < window.cfjDataLayer.length; index++) {
    const layer = window.cfjDataLayer[index]
    if (layer.event) {
      new EventCollector(window.cfjDataLayer.slice(0, index + 1)).sendEvent()
    }
  }

  eventify(window.cfjDataLayer, function(data) {
    const lastEvent = data[data.length - 1]
    if (typeof lastEvent === 'object' && lastEvent.event) {
      new EventCollector(data).sendEvent()
    }
  })
})()
