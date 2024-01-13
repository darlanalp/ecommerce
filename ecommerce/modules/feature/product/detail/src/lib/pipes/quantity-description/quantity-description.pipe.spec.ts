import { QuantityDescriptionPipe } from './quantity-description.pipe';

describe('QuantityDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new QuantityDescriptionPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return unavailable product text', () => {

    const pipe = new QuantityDescriptionPipe();
    const descripton = pipe.transform(0)
    expect(descripton).toBe('Produto indisponível');
  })

  it('should return text from only one product', () => {
    const pipe = new QuantityDescriptionPipe();
    const descripton = pipe.transform(1)
    expect(descripton).toBe('Útimo produto em estoque. Corra antes que esgote');
  })

  it('should return text from many products', () => {
    const pipe = new QuantityDescriptionPipe();
    const descripton = pipe.transform(10)
    expect(descripton).toBe('10 disponíveis');


  })
});
