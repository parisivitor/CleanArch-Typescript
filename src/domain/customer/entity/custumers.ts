/**
 * A REGRA DE NEGOCIO MUDA TUDO!
 * PRIMEIRA regra:
 *  Pensar no motivo do porque ela muda!
 * SEGUNDA regra:
 *  Os dados a todo momento precisam estar conscistentes!
 *     - uma classe custumer por exemplo, não existe a possibilidade de ter um construtor que passe apenas ID, NÃO EXISTE cliente sem nome, pode ate nao ter endereço, mas nome é OBRIGADORIO. Se o objeto não tem os dados OBRIGATORIOS ele é so mais um objeto sem consistencia para o negocio!
 *     - ja uma lead, por exemplo eu posso não pegar o nome, apenas o email, entao nesse caso por uma questão de estrategia de NEGOCIO, o unico campo obrigatorio é o email, e pode sim ter uma nome em branco!
 * TERCEIRA regra:
 *  um entidade por padrão ela SEMPRE vai ser auto validar!
 */

import Address from "../value-object/address";

/**
 * NO SEU SISTEMA VOCE TERA 2 ENTIDADES
 * Uma de NEGOCIO(entidade de vdd) e uma de PERSISTENCIA(model) no banco!
 *
 * Diretorio:
 * Domain     --Complexidade de negocio
 *  |-Entity
 *      |-custumer.ts (regra de negocio)
 * Infra      --Complexidade tecnologico
 *  |-Model|Entity
 *      |-custumer.ts (get,set,ORM)
 */

export default class Custumer {
    private _id: string;
    private _name: string;
    private _address!: Address; //pode não ser obrigatorio no construtor. (! mostra q não é obrigatorio)
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name:string, address?: Address){
        this._id = id;
        this._name = name;
        this._address = address;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("ID is requided!")
        }
        if (this._name.length === 0) {
            throw new Error("Name is requided!")
        }
        if (this._name.length < 3) {
            throw new Error("Name isn`t lower than 4")
        }
    }

    // Não posso ter o risco de ter get e seters, pois eles fogem de qualquer validação que precisa ser feito, quebrando a conscistencia dos dados. É PASSAR POR CIMA DE QUALQUER REGRA DE NEGOCIO QUE EXISTIR!
    set name(name: string) { //ANEMICO logo nao é uma entidade!
        this._name = name;
    }
    changeName(name: string){ // É uma regra de negocio expressiva! É um motivo de negocio do porque ela deve existir!
        this._name = name;
        this.validate()
    }
    changeAddress(address: Address){
        this._address = address;
        this.validate()
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    get address(): Address {
        return this._address
    }

    get active(): boolean {
        return this._active
    }

    isActive(): Boolean{
        return this._active
    }

    activate() {
        if (this._address === undefined ){
            throw new Error("Address is mandatory to activate a custumer")
        }
        this._active = true;
    }
    deactivate(){
        this._active = false;
    }

    addRewardPoints(rewardPoints: number){
        this._rewardPoints += rewardPoints;
    }
    // são regras de negocio, diferente de set _activate q so é um mecanismo de alteração. activate e deactivate é um motivo pelo qual ele sera ativado e desativado!


    set Address(addres: Address){ //Pode normalmente usar um set para Address, pois ele passara um objeto do tipo Addres e não do tipo primitivo !
        this._address = addres
    }
}
