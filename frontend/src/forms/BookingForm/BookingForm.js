import { CardElement } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";

const BookingForm = ({ currentUser, paymentIntent }) => {
  console.log(currentUser);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });

  return (
    <div className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-4">
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            type="text"
            disabled
            readOnly
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            type="text"
            disabled
            readOnly
            {...register("lastName")}
          />
        </label>
        <label className="flex flex-col text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="mt-1  border rounded full-w py-2 px-3 text-gray-700 bg-gray-200"
          type="text"
          disabled
          readOnly
          {...register("email")}
        />
      </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 p-4 rounded-md">
        <div className="font-semibold text-lg">
            Total Cost: ${paymentIntent.totalCost.toFixed(2)}
        </div>
        <div className="text-xs">Includes tax and charges</div>
      </div>
      </div>
        <div className="space-y-2">
        <h2 className="text-xl font-semibold">Payment Details</h2>
        <CardElement id="payment-element" className="border rounded-md p-2 text-sm"/>
        </div>
    </div>
  );
};

export default BookingForm;
