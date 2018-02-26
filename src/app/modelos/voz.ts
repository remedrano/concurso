import {Usuario} from "./usuario";

export interface Voz {
  usuario: Usuario,
  fechaSubida: string,
  estadoVoz: string,
  archivoOriginal: any,
  archivoConvertida: string,
  idVoz: number,
  idConcurso: number
}
