import { ProdutoDto } from './produto-dto';

export interface CartItem {
    quantidade: number;
    produto: ProdutoDto;
}
