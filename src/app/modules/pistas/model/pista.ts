import { Pais } from "../../paises/models/pais";

export interface Pista {
    id: number;
    pais: Pais;
    tamanho: number;
}
