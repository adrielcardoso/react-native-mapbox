import React from 'react';

export default class Config 
{
    static tipo_tudo = '';
    static tipo_ficar = 1;
    static tipo_comer = 2;
    static tipo_comprar = 3;
    static tipo_fazer = 4;
    static tipo_servico = 5;
    // case 1:
    //     return 'Ficar';
    // case 2:
    //     return 'Comer';
    // case 3:
    //     return 'Comprar';
    // case 4:
    //     return 'Fazer';
    // case 5:
    //     return 'Serviço';
    // static HOST_ = 'http://webdev/pmi-intranet2/rudson.mendes/public/visite-itajai/api/';
    static HOST_ = 'https://intranet2.itajai.sc.gov.br/visite-itajai/api/';

    // static HOST_IMAGE = 'http://webdev/pmi-intranet2/rudson.mendes/public/visite-itajai/foto/';
    static HOST_IMAGE = 'https://intranet2.itajai.sc.gov.br/visite-itajai/foto/';

    static translater(tipo){
        switch(tipo){
            case Config.tipo_tudo : return 'Todos';
            case Config.tipo_ficar : return 'Ficar';
            case Config.tipo_comer : return 'Comer';
            case Config.tipo_comprar : return 'Comprar';
            case Config.tipo_fazer : return 'Fazer';
            case Config.tipo_servico : return 'Serviços';
        }
    }

    static HOST_FIND_BY_TAGS = 'https://intranet2.itajai.sc.gov.br/visite-itajai/api/estabelecimentos?nome=';
    static INPUT_FIND_LABEL = 'O que você está procurando ?';
    static INPUT_FIND_LABEL_NORESULT = 'Sem resultados';
    static FAVORITO = 'FAVORITO';

    static mapTheme = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
}