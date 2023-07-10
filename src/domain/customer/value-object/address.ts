/** VALUE OBJECT
 * -Se auto valida
 * -Não tem ID
 * -Seus atributos são privados
 * - Se eu criar esse objeto de valor, não vai ser mais possiver fazer alteração, apenas criando um novo endereço do zero para o meu usuario.
 * Logo vai manter consistencia no seus objetos de valor
 *
 */

/**
 * NÃO TEM NADA HAVER COM BANCO DE DADOS!!!, pois não quer dizer que vou ter uma tabela endereço, ainda porque não tenho um ID!
 * MODELAGEM DE PERSISTENCIA É UMA OUTRA ETAPA DE DESENVOLVIMENTO!!!!!!
 */

export default class Address {
    private _street: string;
    private _city: string;
    private _state: string;
    private _zip_code: string;
    private _country: string;

    constructor(street: string, city: string, state: string, zip_code: string, country: string){
        this._street = street;
        this._city = city;
        this._state = state;
        this._zip_code = zip_code
        this._country = country
        this.validate()
    }

    get street(): string {
        return  this._street;
    }

    get city(): string {
        return  this._city;
    }

    get state(): string {
        return  this._state;
    }

    get zip_code(): string {
        return  this._zip_code;
    }

    get country(): string {
        return  this._country;
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required")
        }
        if (this._city.length === 0) {
            throw new Error("city is required")
        }
        if (this._state.length === 0) {
            throw new Error("state is required")
        }
        if (this._zip_code.length === 0) {
            throw new Error("zip_code is required")
        }
        if (this._country.length === 0) {
            throw new Error("country is required")
        }
    }

    //Posso visualizar de diversasa formças esse objeto, mas nao pode ter sets
    toStringAllAddress(){
        return `${this._city}, ${this._country}, ${this._state}, ${this._street}, ${this._zip_code}`
    }

    toStringOnlyCity(){
        return `${this._city}`
    }

}
