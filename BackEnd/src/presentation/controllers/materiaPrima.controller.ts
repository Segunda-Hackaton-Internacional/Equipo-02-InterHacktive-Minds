// src/infrastructure/controllers/materia-prima.controller.ts
import { NextFunction, Request, Response } from 'express';
import { CreateMateriaPrimaDTO, MateriaPrimaListDto, MateriaPrimaResponseDto } from '../../application/dtos/materiaPrima.dto';
import { CreateMateriaPrimaUseCase, GetAllMateriasPrimasUseCase } from '../../application/useCases/materiaprima/createMateriaPrima.useCase';



export class MateriaPrimaController {
  constructor(
    private readonly createUseCase: CreateMateriaPrimaUseCase,
    private readonly getAllUseCase: GetAllMateriasPrimasUseCase
  ) {}

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dto = req.body as CreateMateriaPrimaDTO;
      const materiaPrima = await this.createUseCase.execute(dto);
      res.status(201).json(this.toResponseDto(materiaPrima));
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
      const materiasPrimas = await this.getAllUseCase.execute();
      res.status(200).json(this.toListDto(materiasPrimas));
    } catch (error) {
      next(error);
    }
  };

  private toResponseDto(materia: any): MateriaPrimaResponseDto {
    return {
      id: materia.id,
      tipo: materia.tipo,
      cantidad: materia.cantidad,
      fechaIngreso: materia.fechaIngreso.toISOString(),
      fechaVencimiento: materia.fechaVencimiento.toISOString(),
      estado: materia.estado
    };
  }

  private toListDto(materias: any[]): MateriaPrimaListDto {
    return {
      materiasPrimas: materias.map(m => this.toResponseDto(m)),
      timestamp: new Date().toISOString()
    };
  }
}




