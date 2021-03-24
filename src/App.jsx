import React from 'react';
import './App.scss';
import Flat from './Flat';
import FlatMarker from "./FlatMarker";
import ReactMapboxGL, {Marker} from "react-mapbox-gl";

const FLATS_URL = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json"

const Map = ReactMapboxGL({ accessToken: "pk.eyJ1Ijoiam9zZXF1ZWlyb3oiLCJhIjoiY2ttbmw1eXNmMHIydTJvbHcxcTJzMGhoNyJ9.GkuqAuIb-rSkyjbSpAUTjA"});

class App extends React.Component {
  state = {
    flats: [],
    selected: -1, // no flat selected
    mapCenter: [2.3522, 48.8566],
    filterText: ''
  }

  componentDidMount(id) {
    fetch(FLATS_URL)
      .then(response => response.json())
      .then(data => this.setState({ flats: data }));
  }

  selectFlat = (id) => {
    // console.log(`Selecting flat ${id}`)
    const { flats } = this.state;
    const flat = flats.find(flat => flat.id === id);
    const newCenter = [flat.lng, flat.lat];
    
    this.setState({ selected: id, mapCenter: newCenter })
  }

  handleFilter = (event) => {
    const text = event.target.value;

    this.setState({ filterText: text });
  }

  render() {
    const { flats, selected, mapCenter, filterText } = this.state;
    const filteredFlats = flats.filter(flat => flat.name.match(new RegExp(filterText, 'i')));

    let flatList = filteredFlats.map(flat => {
        return (
          <Flat
            onSelect={this.selectFlat}
            selected={selected === flat.id}
            key={flat.id}
            id={flat.id}
            imageUrl={flat.imageUrl}
            name={flat.name}
            price={flat.price} />
        )
      });
    
    let flatMarkers = filteredFlats.map(flat => {
      return (
        <Marker key={flat.id} coordinates={[flat.lng, flat.lat]}>
          <FlatMarker
            key={flat.id}
            selected={selected === flat.id}
            price={flat.price} />
        </Marker>
      )
    });

      if (flats.length === 0) {
        flatList = <div>EMPTY LIST OF FLATS</div>;
      }
    

    return (
      <div className="app">
        <div className="main">
          <p>Selected Flat: <code>{selected}</code></p>
          <input className="search" onChange={this.handleFilter} />

          <div className="flats">
            {flatList}
          </div>
        </div>
         
        <div className="map">
          <Map
            zoom={[14]}
            center={mapCenter}
            containerStyle={{ height: '100vh', width: '100%'}} 
            style="mapbox://styles/mapbox/streets-v8">
              {flatMarkers}
          </Map>
        </div>
      </div>
    );
  }
}

export default App;