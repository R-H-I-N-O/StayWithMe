import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import {useMutation} from 'react-query';
import {useAppContext} from "../contexts/AppContext"
import * as apiClient from "../api-client";

const AddHotel = ()=>{
    const {showToast} = useAppContext();
    const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
        onSuccess: ()=>{
            showToast({type: "SUCCESS", message: "Hotel added successfully"});
        },
        onError: ()=>{
            showToast({type: "Error", message: "Error adding hotel"});
        }
    });

    const handleSave = (hotelFormData)=>{
        mutate(hotelFormData);
    }

    return(
        <div>
            <ManageHotelForm onSave = {handleSave} isLoading = {isLoading}/>
        </div>
    );
}

export default AddHotel;