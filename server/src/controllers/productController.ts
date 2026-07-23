import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


// =====================================
// GET ALL PRODUCTS
// =====================================

export async function listProducts(
  _req: Request,
  res: Response
) {
  try {

    const products = await prisma.product.findMany({
  include:{
    category:true,

    modifierGroups:{
      include:{
        options:true
      }
    }

  }
});

    return res.json(products);


  } catch (err) {

    console.error("========== DATABASE ERROR ==========");
    console.error(err);


    return res.status(500).json({
      message: "Database error",
      error: String(err),
    });

  }
}



// =====================================
// GET SINGLE PRODUCT
// =====================================

export async function getProduct(
  req: Request<{ id: string }>,
  res: Response
) {

  try {

    const product = await prisma.product.findUnique({

      where: {
        id: req.params.id,
      },

     include:{
 category:true,

 modifierGroups:{
   include:{
     options:true
   }
 }

}

    });


    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }


    return res.json(product);


  } catch (err) {

    console.error(err);


    return res.status(500).json({
      message: "Database error",
      error: String(err),
    });

  }

}




// =====================================
// CREATE PRODUCT
// =====================================

export async function createProduct(
  req: Request,
  res: Response
) {

  try {


    const product = await prisma.product.create({

      data: {

        name: req.body.name,

        sku: req.body.sku,

        price: Number(req.body.price),

        stockQuantity: Number(req.body.stockQuantity),

        image: req.body.image,

        categoryId: req.body.categoryId,

      },


      include: {

        category: true,

      },

    });



    return res.status(201).json(product);



  } catch (err) {


    console.error("========== CREATE ERROR ==========");
    console.error(err);



    return res.status(500).json({

      message: "Failed to create product",

      error: String(err),

    });


  }

}





// =====================================
// UPDATE PRODUCT
// =====================================

export async function updateProduct(
  req: Request<{ id: string }>,
  res: Response
) {


  try {


    const product = await prisma.product.update({

      where: {

        id: req.params.id,

      },


      data: {


        name: req.body.name,

        sku: req.body.sku,

        price: Number(req.body.price),

        stockQuantity: Number(req.body.stockQuantity),

        image: req.body.image,

        categoryId: req.body.categoryId,


      },


      include: {

        category: true,

      },


    });



    return res.json(product);



  } catch (err) {


    console.error("========== UPDATE ERROR ==========");
    console.error(err);



    return res.status(500).json({

      message: "Failed to update product",

      error: String(err),

    });


  }

}





// =====================================
// ADJUST STOCK
// =====================================

export async function adjustStock(
  req: Request<{ id: string }>,
  res: Response
) {


  try {


    const quantity = Number(req.body.quantity);



    const product = await prisma.product.update({

      where: {

        id: req.params.id,

      },


      data: {


        stockQuantity: {

          increment: quantity,

        },


      },


      include: {

        category: true,

      },


    });



    return res.json(product);



  } catch (err) {


    console.error("========== STOCK ERROR ==========");
    console.error(err);



    return res.status(500).json({

      message: "Failed to adjust stock",

      error: String(err),

    });


  }

}





// =====================================
// DELETE PRODUCT
// =====================================

export async function deleteProduct(
  req: Request<{ id: string }>,
  res: Response
) {


  try {


    await prisma.product.delete({

      where: {

        id: req.params.id,

      },

    });



    return res.status(204).send();



  } catch (err) {


    console.error("========== DELETE ERROR ==========");
    console.error(err);



    return res.status(500).json({

      message: "Failed to delete product",

      error: String(err),

    });


  }

}