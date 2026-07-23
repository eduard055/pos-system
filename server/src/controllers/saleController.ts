import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export async function createSale(
  req: Request,
  res: Response
) {

  try {

    const { items } = req.body;


    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }


    let totalAmount = 0;


    const products = await prisma.product.findMany({
      where: {
        id: {
          in: items.map(
            (item:any)=>item.productId
          ),
        },
      },
    });



    const saleItems = items.map(
      (item:any)=>{

        const product = products.find(
          (p)=>p.id === item.productId
        );


        if(!product){
          throw new Error(
            "Product not found"
          );
        }


        const subtotal =
          product.price * item.quantity;


        totalAmount += subtotal;


        return {
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
          subtotal,
        };

      }
    );



    const sale =
    await prisma.$transaction(
      async(tx)=>{


        for(const item of saleItems){

          await tx.product.update({

            where:{
              id:item.productId
            },

            data:{
              stockQuantity:{
                decrement:item.quantity
              }
            }

          });

        }



        return await tx.sale.create({

          data:{

            invoiceNumber:
              "INV-" + Date.now(),

            totalAmount,

            items:{
              create:saleItems
            }

          },

          include:{
            items:true
          }

        });


      }
    );



    return res.json({
      message:"Sale completed",
      sale
    });


  } catch(err){

    console.error(
      "========== SALE ERROR =========="
    );

    console.error(err);


    return res.status(500).json({

      message:"Failed to create sale",

      error:String(err)

    });

  }

}