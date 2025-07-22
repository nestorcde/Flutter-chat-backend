import { Schema, model } from 'mongoose';
import { IMensaje } from '../types';

const MensajeSchema = new Schema<IMensaje>({
  de: {
    type: String,
    required: true,
  },
  para: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: false,
    default: '0'
  }
}, {
  timestamps: true
});

MensajeSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  return { ...object, uid: _id };
});

export const Mensaje = model<IMensaje>('Mensaje', MensajeSchema);