import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cepMask'
})
export class CepMaskPipe implements PipeTransform {

  

  transform(cep) {

    const value = cep.toString().replace(/\D/g, '');

    let foneFormatado = '';

    if (value.length <= 8) {
      foneFormatado = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    return foneFormatado;
  }
  
}
