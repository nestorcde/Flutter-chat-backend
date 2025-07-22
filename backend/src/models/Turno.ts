import { Schema, model } from 'mongoose';
import { ITurno } from '../types';

const TurnoSchema = new Schema<ITurno>({
  usuario: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: false,
  },
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true
});

TurnoSchema.method('toJSON', function() {
  const { __v, ...object } = this.toObject();
  return object;
});

export const Turno = model<ITurno>('Turno', TurnoSchema);