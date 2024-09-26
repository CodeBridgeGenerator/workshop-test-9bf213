module.exports = function (app) {
  const modelName = "errors";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      serviceName: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      // error: { type: Schema.Types.Mixed, required: false },
      error: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      message: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      stack: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      details: { type: Schema.Types.Mixed, required: false },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false,
        default: null,
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false,
        default: null,
      },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
