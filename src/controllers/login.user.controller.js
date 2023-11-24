import { User } from "../models/user.model.js";
import { ApiErr } from "../utils/ApiErr.js";
import { ApiRes } from "../utils/ApiRes.js";
import { asyncApiHandel } from "../utils/asyncApiHandel.js";

const loginUserController = asyncApiHandel(async (req, res) => {
  let { username, password } = req.body;

  if ([username, password].some((felid) => !felid.length > 0)) {
    throw new ApiErr(400, "All Fields are required");
  }

  let checkIsUserPresent = await User.findOne({ username });
  if (!checkIsUserPresent) {
    throw new ApiErr(
      309,
      "Please Register There is No User Present with given userName "
    );
  }
  const isCorrect = await checkIsUserPresent.isPasswordCorrect(password);

  if (!isCorrect) {
    throw new ApiErr(309, "Give Password is Wrong");
  }

  let userData = await User.findOne({ username }).select("-password");

  return res.status(200).json(new ApiRes(200, userData, "SuccessFully Login"));
});

export { loginUserController };
