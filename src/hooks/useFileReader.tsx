import { useEffect, useState } from "react";

export const useFileReader = (file: FileList) => {
  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>();
  const [fileFromReader, setFileFromReader] = useState<string>();

  useEffect(() => {
    if (file) {
      if (file) {
        setImage(file[0]);
      } else {
        setImage(null);
      }
    }
  }, [file]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      let url = "";
      reader.onloadend = () => {
        setPreview(reader.result as string);
        url = reader.result as string;
        setFileFromReader(url);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);
  return { preview, fileFromReader, setPreview };
};
