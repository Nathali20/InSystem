import { useEffect, useState } from "react";
import Temp from "./components/Temp";
//import Footer from "./components/Footer";
//import Modal from "./components/Modal"

export default function Home() {

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://hubeau.eaufrance.fr/api/v1/temperature/station?code_departement=33&size=20&exact_count=true&format=json&pretty"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, []);

  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (<>
    <div class="Div1">
      <div>
        <h1 class="head">Relevés de température du département de la Gironde</h1>
      </div>

      <div class="w-full mt-20 flex flex-wrap justify-center gap-3 ">
        {data.map((station, index) => (
          <div key={index}
            class="titre">
            <a><h5 class="nom">{station.libelle_station}</h5></a>
            <p> <Temp code_station={station.code_station} /></p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}