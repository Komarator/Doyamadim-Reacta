import {useParams} from "react-router-dom";
import "./PetDetail.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {IMAGE_SUFFIX} from "../utils/Config";
export default function PetDetail(props){
    const [data,setData] = useState(null);
    const params = useParams();
    useEffect(()=>{
        getPetDetail();
    },[]);
    const getPetDetail = () => {
        axios.get(`http://localhost:8081/api/animals/${params.id}`).then(response => {
            setData(response.data);
        });
    }
    if (data){
        return(
            <div className='page-container'>
                <div className='content-wrapper'>
                    <div className='pet-content-wrapper'>
                        <div className='pet-image-wrapper'>
                            <img src={IMAGE_SUFFIX +data.image} className='pet-image' alt={data.animal_name}/>
                        </div>
                        <div className='pet-content-header'>
                            <h1>{data.animal_name}</h1>
                            <h4>{data.animal_breed}</h4>
                            <h3>Aciklama</h3>
                            <p>{data.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return null;
    }

}
