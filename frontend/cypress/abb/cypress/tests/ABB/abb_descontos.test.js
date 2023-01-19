
import {
  loginAdmin,
  loginCoordenador,
  loginPMS,
  novoOrcamento,
  analiseDesconto,
  validacaoDesconto
} from './lib/_util'

describe('T direto / comum / marcopolo / 15% [1]', () => {
  it('t1 automação ', () => {

    var test = {
      orcamento: '',
      codCliente: '1018298',
      codProduto: 'PVCX4601',
      desconto: '15,00',
      quantidade: '1',
      tipoAnaliseDesconto: 'Outro Motivo',
      parecerVendedor: 'Texto de teste',
      aosCuidados: 'Automação',
      planilha: [
        '1.602,56', // PL2020(7%+9,5%+ñ linear) (liquido)
        '681,09',   // PREÇO SOLICITADO LIQUIDO
        '781,78'    // PREÇO SOLICITADO com ICMS PIS e COFINS
      ],
      faturamento: 'Direto',
      consumo: 'Comum',
      vlrTotal: '919,74',
      vlrDesc: '781,78'
    }

    //setup
    loginAdmin()
    novoOrcamento(test)
    loginCoordenador()
    analiseDesconto(test)
    //check      
    loginPMS()
    validacaoDesconto(test)
  })
})
