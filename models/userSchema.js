const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserSchemaDetail = new model("user", UserSchema);

module.exports = UserSchemaDetail;
