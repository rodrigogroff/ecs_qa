
import {
  loginAdmin,
  loginCoordenador,
  loginPMS,
  novoOrcamento,
  confereOrcamento,
  analiseDesconto,
  validacaoDesconto
} from './lib/_util'

describe('T direto comum [1]', () => {
  it('t1 automação ', () => {

    var test = {
      codCliente: '1018843',
      codProduto: 'PVCX4601',
      desconto: '11,11',
      quantidade: '1',
      tipoAnaliseDesconto: 'Outro Motivo',
      parecerVendedor: 'Texto de teste',
      aosCuidados: 'Automação',
      planilha: [
        '1.602,56',
        '758,55',
        '870,70'
      ],
      planilhaIndices: [
        9, 10, 11
      ],
      faturamento: 'Direto',
      consumo: 'Comum',
      vlrTotal: 'R$ 979,53',
      vlrDesc: 'R$ 367,90', // nao bateu
    }

    // 1
    loginAdmin()
    novoOrcamento(test)
    confereOrcamento(test)
    // 2
    loginCoordenador()
    analiseDesconto(test)
    // 3
    loginPMS()
    validacaoDesconto(test)
  })
})
