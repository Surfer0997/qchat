const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const numberFromNickname = (nick:string) => {
    let number = 0;
    for (let i = 0; i<nick.length; i++) {
        number+=nick.charCodeAt(i);
    }
    return number;
}

export const randomNiceColor = (nick:string) => {
    let nicknameNumber = numberFromNickname(nick);
  var r = nicknameNumber % 255;
  var g = nicknameNumber*10 % 255;
  var b = nicknameNumber*17 % 255;

  if (r + g + b < 150) nicknameNumber*2;

  return `${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};


// export const randomNiceColor = () => {

//     var r = randomInt(0, 255);
//     var g = randomInt(0, 255);
//     var b = randomInt(0, 255);
  
//     if (r + g + b < 150) randomNiceColor();
  
//     return `${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
//   };
  