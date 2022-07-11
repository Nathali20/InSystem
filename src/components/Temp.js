import React, { useEffect, useState } from "react";

function Temp({ code_station }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=${code_station}&size=5&sort=desc&pretty`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, []);
  console.log(data);
  if (isLoading) return <p>veuillez patientez...</p>;
  if (!data) return <p>donnée de profil introuvable</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Date(A-M-J)</th>
          <th>Heure</th>
          <th>Température</th>
        </tr>
    </thead>
    <tbody>
      {data.map((temp) => (
        <tr>
          <td>{temp.date_mesure_temp}</td>
          <td>{temp.heure_mesure_temp}</td>
          <td>
              {Math.round(temp.resultat)}
              {temp.symbole_unite}
          </td>
        </tr>
      ))}
    </tbody>
    </table>
  );
}

export default Temp;
