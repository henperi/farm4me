const defaultCallback = (x) => x;

export const uploadFile = async ({
  imageFiles,
  progressCallback = defaultCallback,
}) => {
  const onUploadProgress = (progressEvent) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

    progressCallback(percentCompleted);
  };

  const data = new FormData();
  data.append('imageFiles', imageFiles);

  return onUploadProgress();
};
