module.exports = function(
  success = false,
  message = "",
  res = null,
  data = "data"
) {
  return {
    success,
    message,
    [data]: res
  };
};

// 기본 응답 객체
