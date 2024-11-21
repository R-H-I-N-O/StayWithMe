import { useForm } from "react-hook-form"

const BookingForm = ({currentUser})=>{
    console.log(currentUser);
    const {handleSubmit, register} = useForm({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email
        }
    });

    return(
        <div className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-4">
            <span className="text-3xl font-bold">Confirm Your Details</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
                        type="text"
                        disabled
                        readOnly
                        {...register("firstName")}
                    />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
                        type="text"
                        disabled
                        readOnly
                        {...register("lastName")}
                    />
                </label>
            </div>
            <label className="flex flex-col text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input className="mt-1  border rounded full-w py-2 px-3 text-gray-700 bg-gray-200"
                        type="text"
                        disabled
                        readOnly
                        {...register("email")}
                    />
                </label>
        </div>
    );
}

export default BookingForm;