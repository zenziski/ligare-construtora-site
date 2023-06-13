import axios from "axios";

export async function GetUserInformation() {
  const res = await axios.get("https://freeipapi.com/api/json");

  //TODO Achar uma melhor forma de retornar as informações do navegador

  return {
    ip: res.data.ipAddress,
    city: res.data.cityName,
    state: res.data.regionName,
  };
}
