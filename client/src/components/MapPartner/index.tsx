import { Marker, Polygon, Popup } from "react-leaflet";
import storeIcon from "@/assets/img/store.png";
import L from "leaflet";
import { Partner } from "@/@types/Partner";

const customIcon = L.icon({
  iconUrl: storeIcon,
  iconSize: [32, 32],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
})

type Props = {
  partner: Partner,
  color: {color: string}
}

export function MapPartner({partner, color}: Props) {

  return (
    <>
      <Marker position={partner.address.coordinates} icon={customIcon}>
        <Popup>
          <span className="font-bold">Estabelecimento:</span> {partner.tradingName} 
          <br/> 
          <span className="font-bold">Dono:</span> {partner.ownerName}
        </Popup>
      </Marker>
      <Polygon pathOptions={color} positions={partner.coverageArea.coordinates}/>
    </>
  )
}