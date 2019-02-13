import React, { Component } from 'react';
import { StyleSheet, 
  View, 
  Text, 
  Dimensions,
  Image,
  Animated,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import MapboxGL from '@mapbox/react-native-mapbox-gl';
// import StoreLocatorKit from '@mapbox/store-locator-react-native';

import Config from '../Config';
import Carousel from 'react-native-snap-carousel';
import ImageView from 'react-native-image-view';

const IS_IOS = Platform.OS === 'ios';
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWRyaWVsY2FyZG9zbyIsImEiOiJjam81eGN3bDgwN2N4M3BtZHkyeWppb3Z1In0.2KjraJLi6eHQGYubEFaPtQ';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width * 0.40;

export default class MapScreen extends React.Component {

  mapView;

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
        directions:null,
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
        pointers: {
          features: [],
        },
        pointersComplete: [],
        query: "",
        currentItem:null,
        featureCollection: {
          type: 'FeatureCollection',
          features: Map.latLongDefine,
        },
      }
    }

    async fetchDirections (origin, dest) {
      const originLatLng = {
        latitude: origin[1],
        longitude: origin[0],
      };
      
      const destLatLng = {
        latitude: dest[1],
        longitude: dest[0],
      };
    
      const requestOptions = {
        profile: this.props.type,
        geometry: 'polyline',
      };
    
      let res = null;
      try {
        res = await mapboxClient.getDirections([
          originLatLng,
          destLatLng,
        ], requestOptions);
      } catch (e) {
        console.log(e);
      }
      
      if (res !== null) {
        const directions = res.entity.routes[0];
        this.setState({ directions: directions });
      }
    }

    onDismiss () {
      StatusBar.setBarStyle('dark-content');
      this.setState({ activeTheme: null });
    }

    async componentWillMount () {

      this.animation = new Animated.Value(0);
      MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
      this.findLocations();

      this.animation.addListener(({ value }) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if(index >= this.state.pointers.features.length) {
          index = this.state.pointers.features.length - 1;
        }
        if(index <= 0) {
          index = 0;
        }
        clearTimeout(this.regionTimeout);
        this.regionTimeout = setTimeout(() => {
          if(this.index !== index) {
            this.index = index;
            const { coordinates } = this.state.pointers.features[index].geometry;
            this._map.flyTo(coordinates, 2500);
          }
        }, 10);
      });
    }

    async findLocations(){

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
    
    const zooLevel  = 13;
    const logoEnabled = false;
    const compassEnabled = true;
    const rotateEnabled = true;

    return (
      <View style={styles.container}>
          <MapboxGL.MapView
            ref={(c) => this._map = c}
            showUserLocation
            rotateEnabled={rotateEnabled}
            logoEnabled={logoEnabled}
            compassEnabled={compassEnabled}
            zoomLevel={zooLevel}
            centerCoordinate={[-48.670914, -26.911160]}
            style={styles.container}
            styleURL={MapboxGL.StyleURL.Light}
          >
            <MapboxGL.Animated.ShapeSource 
                id="bar" shape={this.state.pointers != null ? this.state.pointers : this.state.featureCollection} images={{ 
                        1: require('./../assets/marcadores/marker-ficar.png'),
                        2: require('./../assets/marcadores/marker-comer-bar.png'),
                        3: require('./../assets/marcadores/marker-comprar.png'),
                        4: require('./../assets/marcadores/marker-lazer.png'),
                        5: require('./../assets/marcadores/marker-servicos.png'),
                    }}>
                    <MapboxGL.Animated.SymbolLayer id="bar" style={mStyles.icon} />
            </MapboxGL.Animated.ShapeSource>
          </MapboxGL.MapView>
          {this.renderCards()}
      </View>
    )
  }

  renderCards(){
    return <View
              style={styles.scrollView}
              contentContainerStyle={styles.endPadding}
              >
              <Carousel
                  style={styles.carouselStyle}
                  ref={(c) => this._carousel = c}
                  data={this.state.pointers.features}
                  renderItem={this._renderItem}
                  sliderWidth={width}
                  itemWidth={200}
                  onScroll={(event)=>{
                      this.animation.setValue(event.nativeEvent.contentOffset.x);
                  }}
                  useScrollView={true}
              />
          </View>
  }

  _renderItem({ item, index }) {
      return(<TouchableOpacity>
              <View
                  style={styles.card} key={index}>
                          <View style={styles.textContent}>
                              <Text numberOfLines={1} style={styles.cardtitle}>{item.properties.data.nome}</Text>
                              <Text numberOfLines={1} style={styles.cardDescription}>
                                  {item.properties.data.logradouro}
                              </Text>
                          </View>
                          <Image
                              source={item.properties.image}
                              style={styles.cardImage}
                              resizeMode="cover"
                          />
              </View> 
            </TouchableOpacity>);
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    elevation: 1,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    shadowColor: "rgba(0,72,51, 0.9)",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 0 },
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width * 0.5,
  },
  cardImage: {
    flex: 5,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
    paddingLeft: 8,
    paddingTop:8
  },
  cardtitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 10,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0,153,102, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0,153,102, 0.5)",
    position: "absolute",
    borderWidth: 0.5,
    borderColor: "rgba(0,153,102, 0.5)",
  },
});
const mStyles = MapboxGL.StyleSheet.create({
  icon: {
    iconImage: '{icon}',
    iconAllowOverlap: true,
    iconSize: 1.3,
  },
})