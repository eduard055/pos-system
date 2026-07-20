import ProductGrid from "../components/ProductGrid";
import Cart from "../components/Cart";
import { useCart } from "../hooks/useCart";


export default function POS() {

  const {

   cart,

 addToCart,

 increaseQuantity,

 decreaseQuantity,

 removeItem,

 clearCart

} = useCart();
 
  console.log("ADD FUNCTION:", addToCart);  
 console.log("POS clearCart:", clearCart);

  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-3xl font-bold">
          Point of Sale
        </h1>

        <p className="text-slate-500">
          Process customer orders quickly.
        </p>

      </div>



      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">


        <div className="xl:col-span-2">


          <ProductGrid

            onAdd={addToCart}

          />


        </div>



        <Cart

 cart={cart}

 increaseQuantity={increaseQuantity}

 decreaseQuantity={decreaseQuantity}

 removeItem={removeItem}

 clearCart={clearCart}

/>


      </div>


    </div>

  );

}