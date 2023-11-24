import { asyncApiHandel } from "../utils/asyncApiHandel.js";
import { ApiRes } from "../utils/ApiRes.js";
import { ApiErr } from "../utils/ApiErr.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUserController = asyncApiHandel(async (req, res) => {
  let { username, email, fullName, password } = req.body;

  let fields = [username, email, fullName, password];
  let checkFields = fields.some((field) => field.length > 0);

  if (!checkFields) {
    throw new ApiErr(400, "All Fields are Required");
  }

  const userIsExists = await User.findOne({ $or: [{ username }, { email }] });

  if (userIsExists) {
    throw new ApiErr(400, "User Already Exists on given UserName or Email");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiErr(409, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiErr(409, "Avatar has not uploaded in coludinary");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: "",
  });

  const isUserCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!isUserCreated) {
    throw new ApiErr(500, "Some thing went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiRes(200, isUserCreated, "Register Successfully"));
});

export { registerUserController };
