
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
    },
    resetpwd:{
      url: "/operator/resetpwd",
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: "operator.resetpwd"
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
    },
    resetpwd:{
      url: "/project/resetpwd",
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: "project.resetpwd"
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
    delete:{
      url: '/dept/delete',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'dept.delete'
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
    delete:{
      url: '/role/delete',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'role.delete'
      }
    },
    /**或者角色列表 */
    getlist: {
      url: '/role/getlist',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'role.getlist'
      }
    },
    assign:{
      url: '/role/assign',
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: 'role.assign'
      }
    }
  },
  /**资源管理 */
  menu: {
    getlist:{
        url:"/menu/getlist",
        method: HTTP_REQUEST_METHOD.POST,
        param:{
            serviceId:"menu.getlist",
        }
    },
    delete:{
      url:"/menu/delete",
      method: HTTP_REQUEST_METHOD.POST,
      param:{
          serviceId:"menu.delete",
      }
    },
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
  car:{
    getlist:{
        url:"/car/getlist",
        method: HTTP_REQUEST_METHOD.POST,
        param:{
            serviceId:"car.getlist",
        }
    },
    delete:{
      url:"/car/delete",
      method: HTTP_REQUEST_METHOD.POST,
      param:{
          serviceId:"car.delete",
      }
    },
    /** */
    editor: {
      url: "/car/editor",
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: "car.editor"
      }
    },
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
    },
    editor: {
      url: "/carauth/editor",
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: "carauth.editor"
      }
    },
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
      delete:{
        url:"/device/delete",
        method: HTTP_REQUEST_METHOD.POST,
        param:{
            serviceId:"device.delete",
        }
      },
      /** */
      editor: {
        url: "/device/editor",
        method: HTTP_REQUEST_METHOD.POST,
        param: {
          serviceId: "device.editor"
        }
      },
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
      },
      /**删除字典记录 */
      delete:{
        url:"/dictionary/delete",
        method: HTTP_REQUEST_METHOD.POST,
        param:{
            serviceId:"dictionary.delete",
        }
      }
  },
  /**授权管理 */
  oauth:{
    /**获取列表 */
    getlist:{
        url:"/oauth/getlist",
        method: HTTP_REQUEST_METHOD.POST,
        param:{
            serviceId:"oauth.getlist",
        }
    },
    /**授权记录 */
    delete:{
      url:"/oauth/delete",
      method: HTTP_REQUEST_METHOD.POST,
      param:{
          serviceId:"oauth.delete",
      }
    },
    /** */
    editor: {
      url: "/oauth/editor",
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: "oauth.editor"
      }
    },
    resetpwd:{
      url: "/oauth/resetpwd",
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: "oauth.resetpwd"
      }
    }
  },
  house:{
      getlist:{
        url:"/house/getlist",
        method: HTTP_REQUEST_METHOD.POST,
        param:{
            serviceId:"house.getlist",
        }
      },
      delete:{
        url:"/house/delete",
        method: HTTP_REQUEST_METHOD.POST,
        param:{
            serviceId:"house.delete",
        }
      },
      /** */
      editor: {
        url: "/house/editor",
        method: HTTP_REQUEST_METHOD.POST,
        param: {
          serviceId: "house.editor"
        }
      }
  },
  household:{
    getlist:{
      url:"/household/getlist",
      method: HTTP_REQUEST_METHOD.POST,
      param:{
          serviceId:"household.getlist",
      }
    },
    delete:{
      url:"/household/delete",
      method: HTTP_REQUEST_METHOD.POST,
      param:{
          serviceId:"household.delete",
      }
    },
    /** */
    editor: {
      url: "/household/editor",
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: "household.editor"
      }
    }
  },
  /**车场管理 */
  place:{
    getlist:{
      url:"/place/getlist",
      method: HTTP_REQUEST_METHOD.POST,
      param:{
          serviceId:"place.getlist",
      }
    },
    delete:{
      url:"/place/delete",
      method: HTTP_REQUEST_METHOD.POST,
      param:{
          serviceId:"place.delete",
      }
    },
    /** */
    editor: {
      url: "/place/editor",
      method: HTTP_REQUEST_METHOD.POST,
      param: {
        serviceId: "place.editor"
      }
    }
  }
  
}
