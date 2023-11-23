import { asyncApiHandel } from "../utils/asyncApiHandel.js";
import { ApiRes } from "../utils/ApiRes.js";
import { ApiErr } from "../utils/ApiErr.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const userController = asyncApiHandel(async (req, res) => {
  //  get user details from frontend
  // validate - not entry
  // check if user is already exists: username , email
  // check for image / check for avatar
  // upload them to cloudinary , avatar
  // create user object - check user in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

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
  const coverImageLocalPath = req.file?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiErr(409, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiErr(409, "Avatar is required");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
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

export { userController };
