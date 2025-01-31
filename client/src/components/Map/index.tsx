import { Partner } from "@/@types/Partner";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import { MapPartner } from "../MapPartner";
import { Point } from "@/@types/Point";
import { useState } from "react";
import { LatLng } from "leaflet";


type Props = {
  partners: Partner[]
}

const CENTER_OF_BRAZIL: Point = [-14,  -53];

const colors = [
  {color: "yellow"},
  {color: "green"},
  {color: "orange"}
];

export function Map({partners}: Props) {  

  const [latLong, setLatLong] = useState<{lat: number, long: number}>({lat: 0, long: 0});

  function MouseTracker() {
    useMapEvent("mousemove", e => 
      setLatLong({lat: e.latlng.lat, long: e.latlng.lng})
    )
    return null
  }



  return (
    <div className="w-full h-full">
      <p>Cursor position - Lat: {latLong.lat.toFixed(2)} Long: {latLong.long.toFixed(2)}</p>
      <MapContainer className="w-full h-full" center={[-19.95, -44.18]} zoom={5}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MouseTracker/>
        {
          partners.map((partner, idx) => 
            <MapPartner
              key={idx}
              color={colors[idx % colors.length]}
              partner={partner}
            />
          )
        }
      </MapContainer>
    </div>
  )
}