import User from "@/models/user.model";


const nicknameTaken = async function (nickname: string) {
  const user = await User.findOne({nickname});
  console.log(user);
  return !!user; // !! convert to boolean
};

const userService = {
    nicknameTaken
};

export default userService;