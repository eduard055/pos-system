    import { useState } from "react";


    interface Props {

    total: number;

    onClose: () => void;

    onSuccess: (cash: number, change: number) => void;

    }


    export default function CheckoutModal({

    total,

    onClose,

    onSuccess

    }: Props) {


    const [cash, setCash] = useState("");

    const [error, setError] = useState("");



    const handlePayment = () => {

    console.log("HANDLE PAYMENT START");

    console.log("Cash value:", cash);

    console.log("Total:", total);


    const cashAmount = Number(cash);


    console.log("Converted cash:", cashAmount);



    if (!cashAmount) {

        console.log("NO CASH");

        setError("Please enter cash amount");

        return;

    }



    if (cashAmount < total) {

        console.log("NOT ENOUGH MONEY");

        setError("Insufficient payment");

        return;

    }



    const change = cashAmount - total;


    console.log("CHANGE:", change);



    onSuccess(cashAmount, change);


    };



    return (

        <div className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
        ">


        <div className="
            bg-white
            rounded-2xl
            p-6
            w-[400px]
            shadow-xl
        ">


            <h2 className="
            text-2xl
            font-bold
            mb-5
            ">

            Checkout

            </h2>



            <div className="text-lg mb-5">

            Total:

            <span className="font-bold ml-2">

                ₱{total.toFixed(2)}

            </span>

            </div>



            <input

            type="number"

            value={cash}

            onChange={(e)=>setCash(e.target.value)}

            placeholder="Enter cash amount"

            className="
                w-full
                border
                rounded-lg
                p-3
                mb-2
            "

            />



            {
            error && (

                <p className="text-red-500 mb-3">

                {error}

                </p>

            )
            }



            <div className="flex gap-3">


            <button

                onClick={onClose}

                className="
                flex-1
                border
                rounded-lg
                py-3
                "

            >

                Cancel

            </button>



            <button

                onClick={() => {
        console.log("PAY BUTTON CLICKED");
        handlePayment();
    }}

                className="
                flex-1
                bg-blue-600
                text-white
                rounded-lg
                py-3
                "

            >

                Pay

            </button>


            </div>


        </div>


        </div>

    );

    }