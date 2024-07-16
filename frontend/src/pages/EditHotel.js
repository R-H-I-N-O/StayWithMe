import { useMutation, useQuery } from "react-query";
import * as apiCLient from "../api-client";
import { useParams } from "react-router-dom";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import {useAppContext} from "../contexts/AppContext"

const EditHotel = ()=>{
    const {showToast} = useAppContext();
    const {hotelId}  = useParams();

    const {data} = useQuery("fetchMyHotelById", ()=> apiCLient.fetchMyHotelById(hotelId || ""),{
        enabled: !!hotelId
    });

    const {mutate, isLoading} = useMutation(apiCLient.UpdateMyHotelById, {
        onSuccess: ()=>{
            showToast({ type: "SUCCESS", message: "Successfully updated hotel details" });
        },
        onError: (error)=>{
            showToast({ type: "ERROR", message: error.message });
        }
    });

    const handleSave = (hotelFromData)=>{
        mutate(hotelFromData);
    }

    return(
        <ManageHotelForm hotel = {data} onSave={handleSave} isLoading={isLoading}/>
    );
}

export default EditHotel;