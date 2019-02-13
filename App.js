import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import Config from './Config';

MapboxGL.setAccessToken('pk.eyJ1IjoiYWRyaWVsY2FyZG9zbyIsImEiOiJjam81eGN3bDgwN2N4M3BtZHkyeWppb3Z1In0.2KjraJLi6eHQGYubEFaPtQ');

export default class App extends React.Component {

  static latLongDefine = [
    {
      type: 'Feature',
      id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
      properties: {
        icon: 'example',
      },
      geometry: {
        type: 'Point',
        coordinates: [
          -48.670914, -26.911160
        ],
      },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      tipo: '',
      renderGallery:false,
      visible: false,
      currentView: null,
      images: [],
      entries: [
        {
          title:"Restaurante X"
        },
        {
          title:"Restaurante Y"
        },
        {
          title:"Restaurante Z"
        },
        {
          title:"Restaurante X1"
        }
      ],
      loading: false,
      pointers: null,
      pointersComplete: [],
      query: "",
      currentItem:null,
      featureCollection: {
        type: 'FeatureCollection',
        features: Map.latLongDefine,
      }
    }
  }

  componentWillMount(){

      let tipo =  '';

      fetch(Config.HOST_ + "estabelecimentos?tipo="+tipo, {
          headers: new Headers({
            'ctima': '635c04c2c81f845d124b9c6ca56bf642', 
          }), 
        })
        .then(data => data.json())
        .then(response => {
          let data = {
            type: 'FeatureCollection',
            features: []
          };
          for(let single of response){
            data.features.push(
              {
                type: 'Feature',
                id: single.cod_estabelecimento.toString(),
                properties: {
                  icon: single.tipo,
                  data:single,
                },
                geometry: {
                  type: 'Point',
                  coordinates: [
                    parseFloat(single.longitude),
                    parseFloat(single.latitude)
                  ],
                },
              }
            )
          }
          this.setState({
            loading: false,
            pointers: data,
            pointersComplete: data,
            featureCollection:{
              features: Map.latLongDefine
            }
          })
      }).catch(e => {
        this.setState({
          loading: false,
        });
      })
  }

  render() {
    
    const zooLevel  = 11;
    const logoEnabled = false;
    const compassEnabled = true;
    const rotateEnabled = true;

    return (
      <View style={styles.container}>
          <MapboxGL.MapView
            ref={this.captureRef}
            showUserLocation
            rotateEnabled={rotateEnabled}
            logoEnabled={logoEnabled}
            compassEnabled={compassEnabled}
            zoomLevel={zooLevel}
            centerCoordinate={[-48.670914, -26.911160]}
            style={styles.container}
            styleURL={MapboxGL.StyleURL.Light}
          >
            <MapboxGL.ShapeSource 
            id="bar" shape={this.state.pointers != null ? this.state.pointers : this.state.featureCollection} images={{ 
                      1: require('./src/assets/marcadores/marker-ficar.png'),
                      2: require('./src/assets/marcadores/marker-comer-bar.png'),
                      3: require('./src/assets/marcadores/marker-comprar.png'),
                      4: require('./src/assets/marcadores/marker-lazer.png'),
                      5: require('./src/assets/marcadores/marker-servicos.png'),
                  }}>
                <MapboxGL.SymbolLayer id="bar" style={mStyles.icon} />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const mStyles = MapboxGL.StyleSheet.create({
  icon: {
    iconImage: '{icon}',
    iconAllowOverlap: true,
    iconSize: 1.3,
  },
})