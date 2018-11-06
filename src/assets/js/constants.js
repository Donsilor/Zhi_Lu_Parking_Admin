
/**正常接口地址 */
export const HOST = "server_api";
/**文件上传的地址 */
export const UPDATE_FILE_HOST = "server_file";
/**HTTP 请求方法 */
export const HTTP_REQUEST_METHOD = {
  /** */
  GETURL: "geturl",
  GET: "get",
  POST: "post",
  POSTURL: "posturl"
};
/**直接URL文件访问路径前缀,访问需要拼接文件夹和文件名 */
export const GET_FILE_URL = "server_file/file/viewFile?relativePath=";
/**客户端时间戳 */
export const CLIENT_SIDE_TIMESTAMP = new Date().getTime();