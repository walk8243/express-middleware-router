const UppercaseLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LowercaseLetter = 'abcdefghijklmnopqrstuvwxyz';
const NumberLetter = '0123456789';

const Random = {
  getString: (length: number) => {
    const targetLetter = UppercaseLetter + LowercaseLetter + NumberLetter;
    const targetLetterLength = targetLetter.length;
    let str = '';
    for(let i=0; i<length; i++) {
      str += targetLetter[Math.floor(Math.random() * targetLetterLength)];
    }
    return str;
  },
}

export default Random;