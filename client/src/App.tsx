import { useEffect, useState } from "react"
import { Map } from "./components/Map"
import { Partner } from "./@types/Partner"
import { partnerService } from "./api/partner-service";

function App() {

  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    partnerService.findAllPartners()
      .then(res => setPartners(res))
  }, [])

  return (
    <div className="flex justify-center">
      <div className="w-1/2 h-[600px]">
        <Map partners={partners}/>
      </div>
    </div>
  )
}

export default App
