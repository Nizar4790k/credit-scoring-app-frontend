export interface Ireporte {
    meses?: string[];
    cantidadClientes?: number[];
    scoresPromedio?: number[];
    nivelActual?: {
        buenos?: number;
        regulares?: number;
        malos?: number;
    };
    top3Actual?: [
        {
            nombre?: string;
            score?: number;
        }
    ];
}
