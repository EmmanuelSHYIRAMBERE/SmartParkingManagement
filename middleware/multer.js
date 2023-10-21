import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tour_images");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export const uploads = upload.single("backDropImage");

export const fileFilter = (req, file, cb) => {
  if (file.minetype === "image/jpeg" || file.minetype === "image/png") {
    cb(null, true);
  } else {
    // prevent to upload files

    cb({ message: "Unsupported File Format" }, false);
  }
};

// export const uploader = multer((
//   storage: storage,
//   limits: { fileSize: 1023 *1204},
//   fileFilter: fileFilter
// ))
