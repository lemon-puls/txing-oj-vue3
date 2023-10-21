/**
 * 权限校验
 * @param loginUser
 * @param needAccess
 */
import ACCESS_ENUM from "@/access/accessEnum";
import AccessEnum from "@/access/accessEnum";

const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前用户对应的权限
  const loginUserAccess = loginUser?.userRole ?? AccessEnum.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 用户登录即可访问
  if (needAccess === ACCESS_ENUM.USER) {
    // 未登录
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  // 需要管理员权限
  if (needAccess === ACCESS_ENUM.ADMIN) {
    // 无管理员权限
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  // 鉴权通过
  return true;
};

export default checkAccess;
