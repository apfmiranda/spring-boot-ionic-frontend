import { EstadoDto } from './estado-dto';
export interface CidadeDto {
    id: string;
    nome: string;
    estado?: EstadoDto;
}
