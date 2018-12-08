
/**正常接口地址 */
export const HOST = "http://119.29.152.124:8800/";
export const MRLI_DEVICE_SOCKET_URL = "http://119.29.152.124:8102/endpointWisely";
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
export const GET_FILE_URL = "http://119.29.152.124:8840/file/viewFile?relativePath=";