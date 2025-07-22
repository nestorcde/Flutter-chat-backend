import mongoose from 'mongoose';

export const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env['DB_CON']!);
    console.log('Base de datos online');
  } catch (error) {
    console.log(error);
    throw new Error('Error en la base de datos - Ver logs');
  }
};