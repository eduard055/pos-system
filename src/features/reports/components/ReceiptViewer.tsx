import type { Sale } from "../../../store/salesStore";

interface Props {
  sale: Sale;
  onClose: () => void;
}

export default function ReceiptViewer({
  sale,
  onClose,
}: Props) {


  function printReceipt(){

    window.print();

  }


  return (  
        <div
          className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-[9999]
          pointer-events-auto
          "
        >

          <div
          className="
          receipt
          bg-white
          w-[380px]
          rounded-3xl
          shadow-2xl
          p-8
          relative
          z-[10000]
          pointer-events-auto
          "
        >

        <h1 className="text-3xl font-bold text-center">
          POS PRO
        </h1>


        <p className="text-center text-slate-500">
          123 Main Street
          <br />
          Manila, Philippines
        </p>


        <hr className="my-4" />


        <p>
          Date: {sale.date}
        </p>

        <p>
          Time: {sale.time}
        </p>

        <p>
          Receipt #: {sale.receiptNo}
        </p>


        <hr className="my-4" />


        <div className="space-y-2">

          {sale.items.map((item)=>(

            <div
              key={item.id}
              className="flex justify-between"
            >

              <span>
                {item.name}
                <br />
                {item.quantity} x ₱{item.price}
              </span>


              <span>
                ₱{(
                  item.price *
                  item.quantity
                ).toFixed(2)}
              </span>


            </div>

          ))}


        </div>


        <hr className="my-4" />


        <div className="space-y-2">


          <div className="flex justify-between">

            <span>
              Subtotal
            </span>

            <span>
              ₱{sale.subtotal.toFixed(2)}
            </span>

          </div>



          <div className="flex justify-between">

            <span>
              VAT
            </span>

            <span>
              ₱{sale.tax.toFixed(2)}
            </span>

          </div>




          <div
            className="
            flex
            justify-between
            font-bold
            text-xl
            "
          >

            <span>
              TOTAL
            </span>

            <span>
              ₱{sale.total.toFixed(2)}
            </span>


          </div>



          <hr />



          <div className="flex justify-between">

            <span>
              Cash
            </span>

            <span>
              ₱{sale.cash.toFixed(2)}
            </span>

          </div>



          <div className="flex justify-between">

            <span>
              Change
            </span>

            <span>
              ₱{sale.change.toFixed(2)}
            </span>

          </div>


        </div>



        <div
          className="
          flex
          gap-3
          mt-8
          no-print
          "
        >


          <button

          onClick={() => {
            console.log("PRINT CLICKED");
            printReceipt();
          }}

          className="
          relative
          z-[99999]
          flex-1
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-xl
          font-bold
          cursor-pointer
          "
          >
          Print
          </button>



          <button

            onClick={onClose}

            className="
            flex-1
            border
            py-3
            rounded-xl
            "

          >

            Close

          </button>



        </div>


      </div>


    </div>
  );
}