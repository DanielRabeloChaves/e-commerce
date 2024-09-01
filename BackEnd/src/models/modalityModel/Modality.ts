import { Model, Optional } from "sequelize";
import sequelize  from '../../config/dataBase/connection'
import { IModality } from "../_interfaces/modality/IModality";
import ModalityAttributes from './ModalityAttributes'

export interface ModalityCreationAttributes extends Optional<IModality, 'id' | 'createdAt' | 'updatedAt'> {}
export interface ModalityUpdateAttributes extends Partial<IModality> { id: number; }

class Modality extends Model<IModality, ModalityCreationAttributes> implements IModality{
    public id!: number;
    public name!: string;
    public cod!: string;
    public active!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Modality.init(ModalityAttributes, {
      sequelize ,
      tableName: 'modality',
      timestamps: true, // Adiciona 'createdAt' e 'updatedAt'
    }
);

export default Modality;