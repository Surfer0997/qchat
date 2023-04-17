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
  var g = nicknameNumber*10 % 255; // 10 & 17 are random magic numbers, as also 150 is
  var b = nicknameNumber*17 % 255;

  if (r + g + b < 150) nicknameNumber*2;

  return `${r.toString(16)}${g.toString(16)}${b.toString(16)}`; // return as HEX
};