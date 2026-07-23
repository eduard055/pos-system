import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export async function getModifiers(
  req: Request<{productId:string}>,
  res: Response
){

  try {

    const modifiers =
      await prisma.modifierGroup.findMany({

        where:{
          productId:req.params.productId
        },

        include:{
          options:true
        }

      });


    return res.json(modifiers);


  } catch(error){

    console.error(error);

    return res.status(500).json({
      message:"Failed loading modifiers"
    });

  }

}