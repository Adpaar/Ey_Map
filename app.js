'use strict'

const SELECTED_FILL = '#ffff00'

function popUp(people, countryName) {
  const len = people.length
  const countryNumber = len
  const half = Math.ceil(len / 2)
  const firstHalf = people.splice(0, half)
  const secondHalf = people.splice(-half)
  let html = ''
  html += `<div class='popup'>`
  html += `<div class='popup-top'>`
  html += `<div class='country-name'>`
  html += `<h4>${countryName}</h4>`
  html += `</div>`
  html += `<div class='popup-number'>`
  html += `<img src='/assets/img/profile.svg' alt=''>`
  html += `<div class='popup-number-pic'>${countryNumber}</div>`
  html += `</div>`
  html += `</div>`
  html += `<div class='popup-bot'>`
  html += `<h4>Who's from here :</h4>`
  html += `<div class='popup-list'>`
  html += `<ul>`
  firstHalf.forEach(function (guy) {
    html += `<li>${guy.name}</li>`
  })
  html += `</ul>`
  html += `<ul>`
  secondHalf.forEach(function (guy) {
    html += `<li>${guy.name}</li>`
  })
  html += `</ul>`
  html += `</div>`
  html += `</div>`
  html += `</div>`
  return html
}

function layers(data) {
  return L.geoJSON(worldJson, {
    onEachFeature: function (feature, layer) {
      var countryName = feature.properties.name
      var eyCountry = data[countryName]

      if (
        eyCountry &&
        JSON.stringify(eyCountry) !== '{}' &&
        eyCountry.people.length
      ) {
        const html = popUp(eyCountry.people, countryName)
        layer.setStyle({
          fillColor: SELECTED_FILL
        })
        layer.bindPopup(html)
      } else {
        layer.bindPopup(countryName)
      }
    },
    style: {
      weight: 0.5,
      color: '#909090',
      fillColor: '#707070'
    }
  })
}

const eyCountriesLayer = layers(eyCountries)
const eyOriginLayer = layers(eyOrigin)
const map = L.map('map', {
  minZoom: 2,
  maxZoom: 3.5,
  zoomSnap: 0.5,
  layers: [eyCountriesLayer]
}).setView([42, 0], 2)
L.control
  .layers(
    {
      eyCountriesLayer,
      eyOriginLayer
    },
    {},
    {
      collapsed: false
    }
  )
  .addTo(map)
