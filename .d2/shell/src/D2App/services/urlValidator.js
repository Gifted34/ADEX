const UrlValidator = {
  isValidUrl: urlString => {
    try {
      new URL(urlString);
      return true;
    } catch (error) {
      return false;
    }
    // var urlPattern = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,}(\/.*)?$/i;
    // return urlPattern.test(urlString);
  }
};

module.exports = UrlValidator;