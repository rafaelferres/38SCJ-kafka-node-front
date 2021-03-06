import * as React from "react";
import { faExclamationTriangle  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Form() {
    const [idDrone, setIdDrone] = React.useState("");
    const [idDroneError, setIdDroneError] = React.useState(false);

    const [temperatura, setTemperatura] = React.useState(20);
    const [umidade, setUmidade] = React.useState(25);

    const [latitude, setLatitude] = React.useState("");
    const [latitudeError, setLatitudeError] = React.useState(false);

    const [longitude, setLongitude] = React.useState("");
    const [longitudeError, setLongitudeError] = React.useState(false);

    const [dataSend, setDataSend] = React.useState([])

    React.useEffect(() => {
        const interval = setInterval(async () => {
            if(idDrone && ( latitude && latitudeError === false) && (longitude && longitudeError === false) && temperatura && umidade){
                const data = {
                    idDrone,
                    latitude,
                    longitude,
                    temperatura,
                    umidade,
                    date: new Date()
                }

                await fetch('/api/send', {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                setDataSend([...dataSend, data])
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [idDrone, latitude, longitude, temperatura, umidade, latitudeError, longitudeError, setDataSend, dataSend])


    function setLatitudeValidation(e) {
        const latValue = Number(e.target.value)
        isFinite(latValue) && Math.abs(latValue) <= 90 && !isNaN(latValue)  ? setLatitudeError(false) : setLatitudeError(true)

        if(!isNaN(latValue) && e.target.value.length > 0) 
            setLatitude(latValue)
        else
            setLatitude(e.target.value)
    }

    function setLongitudeValidation(e) {
        const longValue = Number(e.target.value)
        isFinite(longValue) && Math.abs(longValue) <= 180 && !isNaN(longValue) ? setLongitudeError(false) : setLongitudeError(true)

        if(!isNaN(longValue) && e.target.value.length > 0){
            setLongitude(longValue)
        }else{
            setLongitude(e.target.value)
        }
    }

    function setIdDroneValidation(e){
        const idDroneData = Number(e.target.value)

        if(e.target.value.toString().length > 0)
            setIdDrone(idDroneData)
        else 
            setIdDrone(e.target.value)

        if(idDroneData > 0)
            setIdDroneError(false)
        else
            setIdDroneError(true)
        
    }

    function dataAtualFormatada(data){
        var dia  = data.getDate().toString().padStart(2, '0'),
            mes  = (data.getMonth()+1).toString().padStart(2, '0'),
            ano  = data.getFullYear(),
            hora = data.getHours().toString().padStart(2, '0'),
            minuto = data.getMinutes().toString().padStart(2, '0');
        return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
    }

    return (
        <main className="w-full max-w-screen-xl relative mx-auto lg:w-auto p-6">
            <div className="bg-white rounded-lg p-6 shadow">
                <form>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idDrone">
                            Identificador do Drone
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="idDrone" id="idDrone" value={idDrone} onChange={(e) => setIdDroneValidation(e)} type="number"/>
                        {idDroneError && <div className="mt-4 text-red-600 text-sm p-4 bg-red-100 rounded">
                            <FontAwesomeIcon icon={faExclamationTriangle}/> <span className="pl-2">Identificador do Drone Inválida</span>
                        </div>}
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
                            Latitude
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="latitude" id="latitude" value={latitude}  onChange={(e) => setLatitudeValidation(e)} type="text"/>
                        {latitudeError && <div className="mt-4 text-red-600 text-sm p-4 bg-red-100 rounded">
                            <FontAwesomeIcon icon={faExclamationTriangle}/> <span className="pl-2">Latitude Inválida</span>
                        </div>}
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logintude">
                            Longitude
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="logintude" id="logintude" type="text" value={longitude} onChange={(e) => setLongitudeValidation(e)}/>
                        {longitudeError && <div className="mt-4 text-red-600 text-sm p-4 bg-red-100 rounded">
                            <FontAwesomeIcon icon={faExclamationTriangle}/> <span className="pl-2">Longitude Inválida</span>
                        </div>}
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="temperatura">
                            Temperatura
                        </label>
                        <input className="rounded-lg overflow-hidden appearance-none bg-gray-300 h-3 w-128 focus:outline-none" type="range" min="-25" max="40" step="1"  value={temperatura} name="temperatura" id="temperatura" onChange={(e) => setTemperatura(Number(e.target.value))}/>  { temperatura && <span className="pl-4">{temperatura}ºC</span> }
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="umidade">
                            Umidade
                        </label>
                        <input className="rounded-lg overflow-hidden appearance-none bg-gray-300 h-3 w-128 focus:outline-none" type="range" min="0" max="100" value={umidade} step="1" name="umidade" id="umidade" onChange={(e) => setUmidade(Number(e.target.value))}/>  { umidade && <span className="pl-4">{umidade}%</span> }
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ativaRastreamento">Ativar rastreamento</label>
                        <select className="shadow border rounded w-full py-2 px-3 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value={0}>Não</option>
                            <option value={1}>Sim</option>
                        </select>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-lg p-6 shadow mt-6">
                {dataSend.length == 0 && (
                    <>
                        Nenhum dado foi enviado.
                    </>
                )}
                {dataSend.length > 0 &&
                    (<>
                        <h1 className="font-bold text-lg">Dados enviados:</h1>
                        <div className="table w-full">
                            <div className="table-row-group">
                            <div className="table-row">
                                <div className="table-cell font-bold">Identificação do Drone</div>
                                <div className="table-cell font-bold">Latitude</div>
                                <div className="table-cell font-bold">Longitude</div>
                                <div className="table-cell font-bold">Temperatura</div>
                                <div className="table-cell font-bold">Umidade</div>
                                <div className="table-cell font-bold">Data</div>
                            </div>
                            {dataSend.sort((a, b) => b.date.getTime() - a.date.getTime()).map((d,i) => (
                                <div className="table-row" key={i}>
                                    <div className="table-cell">{d.idDrone}</div>
                                    <div className="table-cell">{d.latitude}</div>
                                    <div className="table-cell">{d.longitude}</div>
                                    <div className="table-cell">{d.temperatura}ºC</div>
                                    <div className="table-cell">{d.umidade}%</div>
                                    <div className="table-cell">{dataAtualFormatada(d.date)}</div>
                                </div>
                            
                            )
                            )}
                        
                            </div>
                        </div>
                    </>
                    )
                }
            </div>
        </main>
    )
}