package com.analysis.words.controller;

import com.analysis.words.entity.UserInfo;
import com.analysis.words.service.UserInfoService;
import com.analysis.words.utils.ResponseCode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @author admin
 */
@Controller
@RequestMapping("/admin/userinfo")
public class UserInfoController
{
    @Resource
    private UserInfoService userInfoService;

    Map result=null;

    @PostMapping("/login")
    @ResponseBody
    public Map login(String username, String password, HttpSession session)
    {

        Map result=new HashMap();

        try
        {
            UserInfo userInfo=userInfoService.login(username,password);
            if(userInfo!=null&&userInfo.getIsDeleted() != -1)
            {
                Map params=new HashMap();
                params.put("userinfoId",userInfo.getUserinfoId());
                userInfo=userInfoService.findById(params);
                result.put("code", ResponseCode.SUCCESS_HEAD);
                result.put("msg","success");
                result.put("data",userInfo);
                session.setAttribute("userinfo",userInfo);
            }
            else if (userInfo.getIsDeleted() == -1)
            {
                result.put("code",ResponseCode.EXCEPTION_HEAD);
                result.put("msg","用户被删除!");
            }
        } catch (Exception e)
        {
            result.put("code",ResponseCode.EXCEPTION_HEAD);
            result.put("msg","账号或密码输入有误!");
        }
        return result;
    }

    @PostMapping("/registerSubmit")
    @ResponseBody
    public Map register(String username, String password,String confirmPassword){
        Map result=new HashMap();

        UserInfo userInfo = new UserInfo();
        userInfo.setPhone("18000000000");
        userInfo.setPassword(password);
        userInfo.setPower("2");
        userInfo.setTruename("-");
        userInfo.setPositionId(1);
        userInfo.setDepartmentId(13);
        userInfo.setUsername(username);

        userInfoService.add(userInfo);

        result.put("code", ResponseCode.SUCCESS_HEAD);
        result.put("msg","success");
        return result;
    }


    @PostMapping("/findAll")
    @ResponseBody
    public Map findAll(String username,String phone,Integer start,Integer limit,HttpSession session)
    {
        result=new HashMap();
        try
        {
            UserInfo userInfo=(UserInfo) session.getAttribute("userinfo");

            Map params=new HashMap();
            params.put("username",username);
            params.put("phone",phone);
            params.put("start",start);
            params.put("limit",limit);
            params.put("power",userInfo.getPower());
            params.put("userinfoId",userInfo.getUserinfoId());
            System.out.println("userinfoId:"+userInfo.getUserinfoId());
            //List<UserInfo> userInfos=userInfoService.findAll(username,phone,start,limit);
            System.out.println();
            List<UserInfo> userInfos=userInfoService.findAll(params);
            result.put("code", ResponseCode.SUCCESS_HEAD);
            result.put("msg","success");
            result.put("data",userInfos);
            result.put("totalSize",userInfoService.findTotalSize(username,phone));
        } catch (Exception e)
        {
            result.put("code", ResponseCode.EXCEPTION_HEAD);
            result.put("failure",true);
            result.put("msg",e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    @PostMapping("/findById")
    @ResponseBody
    public Map findById(long userinfoId)
    {
        result=new HashMap();
        try
        {
            Map params=new HashMap();
            params.put("userinfoId",userinfoId);

            UserInfo userInfo=userInfoService.findById(params);

            result.put("code", ResponseCode.SUCCESS_HEAD);
            result.put("success",true);
            result.put("msg","success");
            result.put("data",userInfo);
        } catch (Exception e)
        {
            result.put("code", ResponseCode.EXCEPTION_HEAD);
            result.put("failure",true);
            result.put("msg",e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    @PostMapping("/add")
    @ResponseBody
    public Map add(UserInfo userInfo)
    {
        result=new HashMap();
        try
        {
            int count=userInfoService.add(userInfo);
            if(count>0)
            {
                result.put("code", ResponseCode.SUCCESS_HEAD);
                result.put("success",true);
                result.put("msg","用户添加成功");
                result.put("data",count);
            }
            else
            {
                result.put("code", ResponseCode.EXCEPTION_HEAD);
                result.put("failure",true);
                result.put("msg","用户添加失败");
            }
        } catch (Exception e)
        {
            result.put("code", ResponseCode.EXCEPTION_HEAD);
            result.put("failure",true);
            result.put("msg",e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    @PostMapping("/edit")
    @ResponseBody
    public Map edit(UserInfo userInfo)
    {
        result=new HashMap();
        try
        {
            int count=userInfoService.edit(userInfo);
            if (count>0)
            {
                result.put("code", ResponseCode.SUCCESS_HEAD);
                result.put("success",true);
                result.put("msg","用户修改成功!");
            }
            else {
                result.put("code", ResponseCode.EXCEPTION_HEAD);
                result.put("failure",true);
                result.put("msg","用户修改失败!");
            }
        } catch (Exception e)
        {
            result.put("code", ResponseCode.EXCEPTION_HEAD);
            result.put("failure",true);
            result.put("msg",e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    @PostMapping("/modifyPassword")
    @ResponseBody
    public Map modifyPassword(String oldPassword,String newPassword,HttpSession session)
    {
        result=new HashMap();
        try
        {
            if(session!=null)
            {
                UserInfo userInfo=(UserInfo) session.getAttribute("userinfo");
                if(oldPassword!=null&&oldPassword.equals(userInfo.getPassword()))
                {
                    //修改密码
                    int count=userInfoService.modifyPassword(userInfo.getUserinfoId(),newPassword);
                    if(count>0)
                    {
                        result.put("code", ResponseCode.SUCCESS_HEAD);
                        result.put("success",true);
                        result.put("msg","密码修改成功!");
                    }
                }
                else
                {
                    result.put("code", ResponseCode.EXCEPTION_HEAD);
                    result.put("failure",true);
                    result.put("msg","原始密码输入错误");
                }
            }
            else
            {
                result.put("code", ResponseCode.EXCEPTION_HEAD);
                result.put("failure",true);
                result.put("msg","登录超市，请重新登录!");
            }
        } catch (Exception e)
        {
            result.put("code", ResponseCode.EXCEPTION_HEAD);
            result.put("failure",true);
            result.put("msg",e.getMessage());
            e.printStackTrace();
        }

        return result;
    }
    @PostMapping("/delete")
    @ResponseBody
    public Map delete(long userinfoId)
    {
        result=new HashMap();
        try
        {
            int count=userInfoService.delete(userinfoId);
            if(count>0)
            {
                result.put("code", ResponseCode.SUCCESS_HEAD);
                result.put("success",true);
                result.put("msg","用户删除成功！");
            }
            else
            {
                result.put("code", ResponseCode.EXCEPTION_HEAD);
                result.put("failure",true);
                result.put("msg","用户删除失败！");
            }
        } catch (Exception e)
        {
            result.put("code", ResponseCode.EXCEPTION_HEAD);
            result.put("failure",true);
            result.put("msg",e.getMessage());
            e.printStackTrace();
        }

        return result;
    }
}
