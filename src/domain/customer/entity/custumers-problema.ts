/*Porem uma entidade deve ter:
    ID unico
    carrega valores que alteram com o tempo
    tem comportamento
    contem regras de negocio -> É oque faz o DDD ser o DDD!!!
*/

// Logo a nossa entidade vai deixar de carregar os dados para o banco de dados e vai ser responsavel por conduzir as regras de negocio!

//Regras de negocio é: Formas de mudar o comportamento da sua entidade aplicando validações,  formulas, qualquer coisa que satisfaça oque o sistema está pedidno


//EVITE!!! Entidade anemica, parecido com um DTO (Data transfor object) pois ela não carrega regra de negocios, apenas armazena dados.

//Criamos muitas vezes esse tipo de entidade para comunicar com as ORM, entao estamos criando nosso software orientado a ORM
class CustumerAnemico { // -> Entidade anemica!
    _id: string;  //Entidade é unica, pois ela tem um id
    _name: string;  // Tem outros elementos que podem ir mudando
    _address: string;

    constructor(id: string, name:string, address: string){
        this._id = id;
        this._name = name;
        this._address = address;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address(): string {
        return this._address;
    }

    set name(name: string) {
        this._name = name;
    }

    set address(address: string) {
        this._address = address;
    }
}
