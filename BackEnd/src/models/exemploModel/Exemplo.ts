import { Model, Optional } from "sequelize";
import sequelize  from '../../config/dataBase/connection'
import { IExemplo } from "../../interfaces/exemplo/IExemplo";
import ExemploAttributes from './ExemploAttributes'

// Atributos necessários para criação (id e data_criacao são opcionais)
export interface ExemploCreationAttributes extends Optional<IExemplo, 'id' | 'createdAt' | 'updatedAt'> {}

// Atributos necessários para atualização (todos opcionais exceto id)
export interface ExemploUpdateAttributes extends Partial<IExemplo> { id: number; }

class Exemplo extends Model<IExemplo, ExemploCreationAttributes> implements IExemplo{
    public id!: number;
    public name!: string;
    public idade!: number;
    public altura!: number;
    public peso!: number;
    public empregado!: boolean;
    public data_nascimento!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Exemplo.init(ExemploAttributes, {
      sequelize ,
      tableName: 'exemplo',
      timestamps: true, // Adiciona 'createdAt' e 'updatedAt'
    }
  );
  
  export default Exemplo;