## Using google-map-react to create 2 pins and getting the distance between them

### Calculating the distance between 2 coordinates
https://www.movable-type.co.uk/scripts/latlong.html

```javascript
const distanceCalc = (lat1, lon1, lat2, lon2) => {

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a =   Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres

    return d
};

export default distanceCalc;
```

### Custom marker from
https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4

Then I changed the .pin margin to  
```css
margin: -40px 0 0 -20px;
```
and the .pulse to
```css
margin: -9px 0px 0px -12px;
```

This is so that the point of this pin is in the currect location. 

### main code


took me a while to get the on clickworking 
```javascript
onClick={(e) => setpin(e)}
```

The map
```javascript
<GoogleMapReact
    bootstrapURLKeys={{ key:'my key' }}
    defaultCenter={defaultProps.center}
    defaultZoom={defaultProps.zoom}
    onClick={(e) => setpin(e)}
>
    <Marker
        lat={coordinates.selected_lat_1}
        lng={coordinates.selected_lng_1}
        name="My Marker"
        color="blue"
    />
    <Marker
        lat={coordinates.selected_lat_2}
        lng={coordinates.selected_lng_2}
        name="My Marker"
        color="red"
    />
</GoogleMapReact>
```

The setpin func
```javascript
  function setpin(e) {
    if (flip_flp === 0) {
      flip_flp = 1
      if (coordinates.selected_lat_2 !== 0) {
        d = distanceCalc(e.lat, e.lng, coordinates.selected_lat_2, coordinates.selected_lng_2)
      }
      setcoordinates(coordinates => ({
        ...coordinates,
        selected_lat_1: e.lat,
        selected_lng_1: e.lng,
        distance: d,
      }))
    } else {
      flip_flp = 0
      d = distanceCalc(coordinates.selected_lat_1, coordinates.selected_lng_1, e.lat, e.lng)
      setcoordinates(coordinates => ({
        ...coordinates,
        selected_lat_2: e.lat,
        selected_lng_2: e.lng,
        distance: d,
      }))
    }
  }
```
