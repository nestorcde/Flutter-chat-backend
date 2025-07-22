import { Server } from 'socket.io';
import { comprobarJWT } from '../middlewares';
import { grabarMensaje, mensajeLeido } from '../controllers/mensaje';
import { usuarioConectado, usuarioDesconectado } from '../controllers/usuario';

interface MessagePayload {
  de: string;
  para: string;
  mensaje: string;
}

interface MessageReadPayload {
  uid: string;
  deUid: string;
}

interface TypingPayload {
  paraUid: string;
  escribiendo: boolean;
}

interface TurnoPayload {
  uid: string;
  day: number;
  month: number;
  year: number;
  hour: string;
}

interface UserReviewPayload {
  uid: string;
  valor: boolean;
}

export const initializeSocket = (io: Server): void => {
  io.on('connection', (client) => {
    const token = client.handshake.headers['x-token'] as string;
    const [valido, uid] = comprobarJWT(token);

    if (!valido || !uid) {
      client.disconnect();
      return;
    }

    // Cliente autenticado
    usuarioConectado(uid)
      .then(() => {
        io.emit('usuario-conectado-desconectado', { uid, online: true });
      })
      .catch(console.error);

    // Unir al cliente a una sala con su uid
    client.join(uid);

    // Escuchar mensaje personal
    client.on('mensaje-personal', async (payload: MessagePayload) => {
      try {
        const msg = await grabarMensaje(payload);
        if (msg) {
          io.to(payload.para).emit('mensaje-personal', msg);
          io.to(payload.de).emit('mensaje-personal', msg);
        }
      } catch (error) {
        console.error('Error grabando mensaje:', error);
      }
    });

    // Mensaje leído
    client.on('mensaje-leido-sale', async (payload: MessageReadPayload) => {
      try {
        const success = await mensajeLeido(payload);
        if (success) {
          io.to(payload.deUid).emit('mensaje-leido', payload);
        }
      } catch (error) {
        console.error('Error marcando mensaje como leído:', error);
      }
    });

    // Escribiendo
    client.on('escribiendo-sale', (payload: TypingPayload) => {
      io.to(payload.paraUid).emit('escribiendo', payload);
    });

    // Grabar turno
    client.on('registra-turno', (payload: TurnoPayload) => {
      io.emit('registra-turno', payload);
    });

    // Usuario revisado/desrevisado
    client.on('revisa-usuario', (payload: UserReviewPayload) => {
      io.to(payload.uid).emit('reiniciar', payload);
    });

    // Cliente desconectado
    client.on('disconnect', () => {
      usuarioDesconectado(uid)
        .then(() => {
          io.emit('usuario-conectado-desconectado', { uid, online: false });
        })
        .catch(console.error);
    });
  });
};