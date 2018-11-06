
import {HTTP_REQUEST_METHOD, UPDATE_FILE_HOST} from "./constants";

export default {
  /**
   * 用户管理
   */
  operator: {
    /** 获取用户列表  */
    getlist: {
      /**接口地址 */
      url: '/operator/getlist',
      /**接口方法 */
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        /**业务ID */
        serviceId: 'operator.getlist'
      }
    },
    /** 登陆接口  */
    login: {
      url: '/operator/login',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'operator.login'
      }
    },
    /** 新增修改用户信息接口 */
    editor: {
      url: '/operator/editor',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'operator.editor'
      }
    },
    /**删除用户 */
    delete: {
      url: '/operator/delete',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'operator.delete'
      }
    }
  },
  /**
   * 项目管理
   */
  project: {
    /**新增或者修改项目 */
    editor: {
      url: '/project/editor',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'project.editor'
      }
    },
    /**获取项目列表 */
    getlist: {
      url: '/project/getlist',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'project.getlist'
      }
    },
    /**删除项目 */
    delete: {
      url: '/project/delete',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'project.delete'
      }
    }
  },
  /**部门管理 */
  dept: {
    /**新增或修改部门 */
    editor: {
      url: '/dept/editor',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'dept.editor'
      }
    },
    /**获取部门列表 */
    getlist: {
      url: '/dept/getlist',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'dept.getlist'
      }
    }
  },
  /**角色管理 */
  role: {
    /**新增或修改角色 */
    editor: {
      url: '/role/editor',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'role.editor'
      }
    },
    /**或者角色列表 */
    getlist: {
      url: '/role/getlist',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'role.getlist'
      }
    }
  },
  /**资源管理 */
  menu: {
    /**新增或者修改资源 */
    editor: {
      url: '/menu/editor',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'menu.editor'
      }
    }
  },
  /**车辆区域管理 */
  area: {
    /**获取车辆区域列表 */
    getlist: {
      url: '/area/getlist',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'area.getlist'
      }
    }
  },
  /* 日志管理 */
  log: {
    /* 删除日志 */
    delete: {
      url: "/log/delete",
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: "log.delete"
      }
    },
    /* 修改日志 */
    editor: {
      url: "/log/editor",
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: "log.editor"
      }
    },
    /* 获取日志 */
    getlist: {
      url: "/log/getlist",
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: "log.getlist"
      }
    }
  },
  /* 系统配置 */
  sysconfig: {
    /* 获取配置信息接口 */
    getbyid: {
      url: '/sysconfig/getbyid',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'sysconfig.getbyid'
      }
    }
  },
  /**车辆授权管理 */
  carauth: {
    /**获取授权列表 */
    getauth: {
      url: '/carauth/getauth',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'carauth.getauth'
      }
    }
  },
  /**月卡续费管理 */
  delay: {
    /**续费列表 */
    getlist: {
      url: '/delay/getlist',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'delay.getlist'
      }
    }
  },
  //**设备管理 */
  device:{
      /**获取设备列表 */
      getlist:{
          url:"/device/getlist",
          method: HTTP_REQUEST_METHOD.POST,
          param:{
              serviceId:"device.getlist",
          }
      }
  },
  /**文件管理 */
  file:{
      fileUpload:{
          url:"/file/fileUpload?folder=$folder&filename=$filename",
          method: HTTP_REQUEST_METHOD.POSTURL,
          config:{
              baseURL:UPDATE_FILE_HOST,
              headers: {"Accept": "multipart/form-data"}
          }
      }
  },
  /**数据字典管理 */
  dictionary:{
      /**获取数据字典列表 */
      getlist:{
          url:"/dictionary/getlist",
          method: HTTP_REQUEST_METHOD.POST,
          param:{
              serviceId:"dictionary.getlist",
          }
      }
  }
}
