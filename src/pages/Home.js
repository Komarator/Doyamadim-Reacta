import PetCardItem from "../components/PetCardItem";
import "./Home.css";
import {useEffect, useState} from "react";
import axios from "axios";
export default function Home(){
    const [animalData,setAnimalData] = useState([]);
    useEffect(()=>{
        getAnimals();
    },[]);
   const getAnimals = () => {
       axios.get('http://localhost:8081/api/animals').then(response => {
            setAnimalData(response.data);
       });
   }
    return(
        <div className='page-container'>
            <div className='pet-container'>
                {animalData.map((el,i) => <PetCardItem key={i} data={el}/>)}
            </div>
        </div>
    )
}
