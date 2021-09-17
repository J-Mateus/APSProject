import { Storage } from '@capacitor/storage';
import { Usuario } from '../models/usuario';


export class LocalStorage {

    setUsuario = async (usuario: Usuario) => {
        await Storage.set({
          key: 'usuario',
          value: JSON.stringify(usuario),
        });
    };
      
    getUsuario = async () => {
        const { value } = await Storage.get({ key: 'usuario' });
        return JSON.parse(value);
    };
      
    removeUsuario = async () => {
        await Storage.remove({ key: 'usuario' });
    };

}