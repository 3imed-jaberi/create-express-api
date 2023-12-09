module.exports.parseURL = (url) => {
  try {
    new URL(url);
    return url;
  } catch (error) {
    throw error;
  }
};
