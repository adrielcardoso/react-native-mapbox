import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoiYWRyaWVsY2FyZG9zbyIsImEiOiJjam81eGN3bDgwN2N4M3BtZHkyeWppb3Z1In0.2KjraJLi6eHQGYubEFaPtQ');

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
            styleURL={MapboxGL.StyleURL.Street}
            zoomLevel={15}
            centerCoordinate={[11.256, 43.770]}
            style={styles.container}>
        </MapboxGL.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});