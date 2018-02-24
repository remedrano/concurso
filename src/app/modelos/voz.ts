import {Usuario} from "./usuario";

export interface Voz {
  usuario: Usuario,
  fechaSubida: string,
  estadoVoz: string,
  archivoOriginal: string,
  archivoConvertida: string,
  idVoz: number,
}
