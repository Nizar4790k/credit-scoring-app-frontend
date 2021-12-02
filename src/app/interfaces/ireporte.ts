export interface Ireporte {
    meses?: string[];
    cantidadClientes?: number[];
    averageScores?: number[];
    currentLevel?: {
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
