import "./PetCardItem.css";
import {Button} from "antd";
import {Paw} from "./SvgIcons";
import {RightOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";
import {IMAGE_SUFFIX} from "../utils/Config";
export default function PetCardItem({data,userLevel,removeItem}){
    return(
        <div className='card-item'>
            <div className='card-image-wrapper'>
                <img src={IMAGE_SUFFIX + data.image} alt='Sari Kedi' className='card-image' />
            </div>
            <div className='card-content'>
                <h4>{data.animal_name}</h4>
                <h5>{data.animal_breed}</h5>
                <p>{data.description.length > 160 ? `${data.description.substring(0,160)}...`: data.description}</p>
            </div>
            <div className='card-actions'>
                <Button icon={<Paw/>} title='Sahiplen' />
                {userLevel && <Link to={`/pets/update/${data.id}`}><Button icon={<EditOutlined />} title='Duzenle' /></Link>}
                {userLevel && <Button onClick={()=>{removeItem && removeItem(data.id)}} icon={<DeleteOutlined />} title='Sil' />}
                <Link to={`/pets/${data.id}`}><Button icon={<RightOutlined />} title='Detay Goruntule' /></Link>
            </div>
        </div>
    )
}
