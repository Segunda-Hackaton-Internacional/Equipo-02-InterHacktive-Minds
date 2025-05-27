import { NextFunction, Request, Response } from "express";
import { CreateMateriaPrimaDto, MateriaPrimaListDto, MateriaPrimaResponseDto } from "../../application/dtos/materiaPrima.dto";
import { CreateMateriaPrimaUseCase } from "../../application/useCases/materiaprima/createMateriaPrima.useCase";
import { GetAllMateriaPrimaUseCase } from "../../application/useCases/materiaprima/getAllMateriaPrima.useCase";


export class MateriaPrimaController {

  constructor(
    private readonly createUseCase: CreateMateriaPrimaUseCase,
    private readonly getAllUseCase: GetAllMateriaPrimaUseCase,
    
  ) {}

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user!.id;      
      const dto = req.body as CreateMateriaPrimaDto;
      const product = await this.createUseCase.execute(userId,dto);
      res.status(201).json(this.toResponseDto(product));
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const products = await this.getAllUseCase.execute();
      res.status(200).json(this.toListDto(products));
    } catch (error) {
      next(error);
    }
  };

  private toResponseDto(product: any): MateriaPrimaResponseDto {
      return {
        id:             product.id,
        userId:         product.userId,
        name:           product.name,
        price:          product.price,
        quantity:       product.quantity,
        expirationDate: product.expirationDate,
      };
    }
  
    // --- Helper interno para mapear arreglo de BaseProduct a ProductsListDto ---
    private toListDto(products: any[]): MateriaPrimaListDto{
      return {
        products: products.map(p => this.toResponseDto(p))
      };
    }

}


