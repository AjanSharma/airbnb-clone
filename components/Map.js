// import React from 'react'
// import ReactMapGL from 'react-map-gl'
// import { useState } from 'react'

// function Map() {

//     const [viewport, setViewport] = useState({
//         width: '100%',
//         height: '100%',
//         latitude: 37.7577,
//         longitude: -122.4376,
//         zoom: 11,
//     })

//   return (
//     <ReactMapGL
//         mapStyle={'mapbox://styles/ajansharma7/clbtsw0hv003314p9zah8pv8m'}
//         mapboxAccessToken={process.env.mapbox_key}
//         {...viewport}
//         onViewportChange={(nextViewport) => setViewport(nextViewport)}
//     >

//     </ReactMapGL>);
// }

// export default Map




import React, { useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl';
import ReactMapGL from 'react-map-gl'
import getCenter from 'geolib/es/getCenter';

const Maps = ({ searchResults }) => {

    const [selectedLocation, setSelectedLocation] = useState({});
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    const center = getCenter(coordinates);
    return (
        <ReactMapGL mapboxAccessToken={process.env.mapbox_key}
            initialViewState={{
                width: "100%",
                height: "100%",
                longitude: center.longitude,
                latitude: center.latitude,
                zoom: 11
            }}
            mapStyle="mapbox://styles/ajansharma7/clbtsw0hv003314p9zah8pv8m">
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker longitude={result.long} latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}>
                        <p
                            role='img'
                            onClick={() => setSelectedLocation(result)}
                            className='cursor-pointer text-2xl animate-bounce'
                            aria-label="push-pin">📌</p>
                    </Marker>

                    {selectedLocation.long === result.long ? (
                        <Popup
                            closeOnClick={true}
                            onClose={() => setSelectedLocation({})}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : (false)}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Maps