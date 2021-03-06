const Pet = require('../src/pet');

describe('constructor', () => {
    it('returns an object', () => {
      expect(new Pet('Fido')).toBeInstanceOf(Object);
    });
    it('sets the name property', () => {
      const pet = new Pet('Fido');
      expect(pet.name).toEqual('Fido');
    });
    it('has an initial age of 0', () => {
      const pet = new Pet('Fido');
      expect(pet.age).toEqual(0);
    });
    it('has initial hunger of 0', () =>{
      const pet = new Pet('Fido');
      expect(pet.hunger).toEqual(0);
    });
    it('has initial fitness of 10', () => {
      const pet = new Pet('Fido');
      expect(pet.fitness).toEqual(10);
    });
    it('has no children initially', () => {
      const pet = new Pet('Fido');
      expect(pet.children).toEqual([]);
    })
    it('is initially alive', () =>{
      const pet = new Pet('Fido');
      expect(pet.isAlive).toBe(true);
    });
  });
  
  describe('growUp', () => {
    it('increments Fidos age by 1', () =>{
      const pet = new Pet('Fido');
      pet.growUp();
      expect(pet.age).toEqual(1);
    });
    it('increments Fidos age by 2 if we call the function 2 times', () =>{
      const pet = new Pet('Fido)');
      pet.growUp();
      pet.growUp();
      expect(pet.age).toEqual(2);
    });
  });

  describe('hunger', ()=> {
    it('increments Fidos hunger by 5 on aging by 1', () =>{
      const fido = new Pet('Fido');
      fido.growUp();
      expect(fido.hunger).toEqual(5);
    });
  });

  describe('fitness', () => {
    it('decreases Fidos fitness by 3 on aging by 1', () =>{
      const fido = new Pet('Fido');
      fido.growUp();
      expect(fido.fitness).toEqual(7);
    });
  });

  describe('walk', () => {
    it('increases fitness by 4 when walk is called', () =>{
      const pet = new Pet('Fido');
      pet.fitness = 4;
      pet.walk();
      expect(pet.fitness).toEqual(8);
    });
    it('increases fitness to no higher than 10', () =>{
      const pet = new Pet('Fido');
      pet.fitness = 8;
      pet.walk();
      expect(pet.fitness).toEqual(10);
    });
  });

  describe('feed', () => {
    it('decreases hunger by 3 when feed is called', () => {
      const pet = new Pet('Fido');
      pet.hunger = 5;
      pet.feed();
      expect(pet.hunger).toEqual(2);
    });
    it('decreases hunger, but not to below 0, when feed is called', () => {
      const pet = new Pet('Fido');
      pet.hunger = 2;
      pet.feed();
      expect(pet.hunger).toEqual(0);
    });
  });

  describe('checkUp', () =>{
    it('pet asks for a walk if unfit', () =>{
      const pet = new Pet('Fido');
      pet.fitness = 1;
      expect(pet.checkUp()).toBe('I need a walk');
    });
    it('pet asks for food if hungry', () =>{
      const pet = new Pet('Fido');
      pet.hunger = 6;
      expect(pet.checkUp()).toBe('I am hungry');
    });
    it('pet asks for food and a walk if both unfit and hungry', () =>{
      const pet = new Pet('Fido');
      pet.fitness = 1;
      pet.hunger = 6;
      expect(pet.checkUp()).toBe('I am hungry AND I need a walk');
    });
    it('pet declares it is happy if both fed and fit', () =>{
      const pet = new Pet('Fido');
      pet.fitness = 4;
      pet.hunger = 4;
      expect(pet.checkUp()).toBe('I feel great!');
    });
  });
  
  describe('deathConditions', () =>{
    it('pet is dead if fitness is 0 or less', () =>{
      const pet = new Pet('Fido');
      pet.fitness = 0;
      expect(pet.isAlive).toBe(false);
    });
    it('pet is dead if hunger is 10 or more', () =>{
      const pet = new Pet('Fido');
      pet.hunger = 10;
      expect(pet.isAlive).toBe(false);
    });
    it('pet is dead on the age of 30', () =>{
      const pet = new Pet('Fido');
      pet.age = 30;
      expect(pet.isAlive).toBe(false);
    });
    it('pet is still alive if no death conditions are met', () => {
      const pet = new Pet('Fido');
      expect(pet.isAlive).toBe(true);
    })
  });

describe('deadPet', () => {
  it('checkUp() function alerts us that the pet is dead (age too high)', () => {
    const pet = new Pet('Fido');
    pet.age = 30;
    expect(pet.checkUp()).toBe('Your pet is no longer alive :(');
  });
  it('checkUp() function alerts us that the pet is dead (hunger too high)', () =>{
    const pet = new Pet('Fido');
    pet.hunger = 10;
    expect(pet.checkUp()).toBe('Your pet is no longer alive :(');
  });
  it('checkUp() function alerts us that the pet is dead (fitness too low)', () =>{
    const pet = new Pet('Fido');
    pet.fitness = 0;
    expect(pet.checkUp()).toBe('Your pet is no longer alive :(');
  });
  it('walk(), feed() and growUp() functions should throw an error if the pet is dead', () => {
    const pet = new Pet('Fido');
    pet.age = 30;
    expect(() => pet.feed()).toThrow('Your pet is no longer alive :(');
    expect(() => pet.walk()).toThrow('Your pet is no longer alive :(');
    expect(() => pet.growUp()).toThrow('Your pet is no longer alive :(');
  });
  it('pet should function as normal if still alive', () =>{
    const pet = new Pet('Fido');
    expect(pet.checkUp()).toBe('I feel great!');
  });
});

describe('adoptedChild', () => {
  it('Amelia has an adopted child named River', () =>{
    const parent = new Pet('Amelia');
    const child = new Pet('River');
    parent.adoptChild(child);
    expect(parent.name).toBe('Amelia');
    expect(child.name).toBe('River');
    expect(parent.children[0].name).toBe('River');
  });
  it('an error is thrown if Amelia, the parent, is dead', () =>{
    const parent = new Pet('Amelia');
    const child = new Pet('River');
    parent.age = 30;
    expect(() => parent.adoptChild(child)).toThrow('Your pet is no longer alive :(');
  });
  it('an error is thrown if River, the child, is dead prior to adoption', () => {
    const parent = new Pet('Amelia');
    const child = new Pet('River');
    child.age = 30;
    expect(() => parent.adoptChild(child)).toThrow('Your pets child is no longer alive :(');
  })
});

describe('biologicalChild', () =>{
  it('Amelia has a biological child named River', () => {
    const parent = new Pet('Amelia');
    parent.haveBaby('River');
    expect(parent.children[0].name).toBe('River');
  });
  it('an error should be thrown if Amelia, the parent, is dead', () =>{
    const parent = new Pet('Amelia');
    parent.age = 30;
    expect(() => parent.haveBaby('River')).toThrow('Your pet is no longer alive :(');
  })
});