import { Campeonato } from "../../campeonatos/models/campeonato";
import { Pista } from "../../pistas/model/pista";

export interface Corrida {
    id: number;
    data: string;
    pista: Pista;
    campeonato: Campeonato;
}
