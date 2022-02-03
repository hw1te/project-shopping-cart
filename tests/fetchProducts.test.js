require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', async () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função', async () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url. Dica: Lembre-se de usar o new Error(mensagem esperada aqui) para comparar com o objeto retornado da API', async () => {
    expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'));
  });
  // consultei https://stackoverflow.com/questions/50821835/how-do-i-properly-test-for-a-rejected-promise-using-jest
});
