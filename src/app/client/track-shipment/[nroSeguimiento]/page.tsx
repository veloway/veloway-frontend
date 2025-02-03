"use client"
import SkeletonShipmentFound from "@/components/client/skeleton-shipment-found/SkeletonShipmentFound";
import { ShipmentFound } from "@/components/ui/shipment-found/ShipmentFound";
import { GetEnvioDto } from "@/entities/envios/getEnvioDto";
import { EnviosService } from "@/services/envios.service";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

function TrackShipmentPage() {
  const [shipment, setShipment] = useState<GetEnvioDto>();
  const { nroSeguimiento } = useParams();

  useEffect(() => {
    EnviosService.getByNroSeguimiento(Number(nroSeguimiento))
      .then((shipment) => {
        setShipment(shipment);
      })
  }, [])
  
  if (!shipment) return <SkeletonShipmentFound />;

  return <ShipmentFound shipment={shipment} />;
}

export default TrackShipmentPage;