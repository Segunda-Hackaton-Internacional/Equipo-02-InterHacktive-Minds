interface ProductionResult {
    unidadesProducidas: number;
    mangoNoUtilizado: number;
    pitahayaNoUtilizada: number;
}

export function calcularProduccion(
    mangoDisponibleKg: number,
    pitahayaDisponibleKg: number,
    mangoPorUnidadGramos: number = 35,
    pitahayaPorUnidadGramos: number = 23
): ProductionResult {
    // Convertir gramos a kilogramos
    const mangoPorUnidadKg = mangoPorUnidadGramos / 1000;
    const pitahayaPorUnidadKg = pitahayaPorUnidadGramos / 1000;

    // Calcular unidades posibles con cada materia prima
    const unidadesPorMango = mangoDisponibleKg / mangoPorUnidadKg;
    const unidadesPorPitahaya = pitahayaDisponibleKg / pitahayaPorUnidadKg;

    // El límite es el ingrediente más escaso
    const unidadesProducidas = Math.floor(Math.min(unidadesPorMango, unidadesPorPitahaya));

    // Calcular kilos no utilizados
    const mangoUtilizado = unidadesProducidas * mangoPorUnidadKg;
    const pitahayaUtilizada = unidadesProducidas * pitahayaPorUnidadKg;

    const mangoNoUtilizado = mangoDisponibleKg - mangoUtilizado;
    const pitahayaNoUtilizada = pitahayaDisponibleKg - pitahayaUtilizada;

    return {
        unidadesProducidas,
        mangoNoUtilizado,
        pitahayaNoUtilizada,
    };
}