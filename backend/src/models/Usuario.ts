import { Schema, model } from 'mongoose';
import { IUsuario } from '../types';

const UsuarioSchema = new Schema<IUsuario>({
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  imgProfile: {
    type: String,
    required: true,
    default: 'blank-profile-picture.png'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
  noLeidos: {
    type: Number,
    default: 0
  },
  revisado: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  tutorial: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.method('toJSON', function() {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

export const Usuario = model<IUsuario>('Usuario', UsuarioSchema);