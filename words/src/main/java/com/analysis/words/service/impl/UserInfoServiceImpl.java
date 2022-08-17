package com.analysis.words.service.impl;


import com.analysis.words.entity.UserInfo;
import com.analysis.words.exception.MyException;
import com.analysis.words.mapper.UserInfoMapper;
import com.analysis.words.service.UserInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


/**
 * @author admin
 */
@Service
public class UserInfoServiceImpl implements UserInfoService
{
    @Resource
    private UserInfoMapper userInfoMapper;

    @Override
    public UserInfo login(String username, String password)
    {
        try
        {
            return userInfoMapper.login(username,password);
        } catch (Exception e)
        {
            e.printStackTrace();
            throw new MyException(e.getMessage());
        }
    }
    @Override
    public List<UserInfo> findAll(Map params)
    {
        try
        {
            return userInfoMapper.findAll(params);
        } catch (Exception e)
        {
            e.printStackTrace();
            throw new MyException(e.getMessage());
        }
    }

    @Override
    public int findTotalSize(String username, String phone)
    {
        try
        {
            return userInfoMapper.findTotalSize(username,phone);
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw new MyException(e.getMessage());
        }
    }

    @Override
    public UserInfo findById(Map params)
    {
        return userInfoMapper.findById(params);
    }

    @Override
    public int add(UserInfo userInfo)
    {
        return userInfoMapper.add(userInfo);
    }

    @Override
    public int edit(UserInfo userInfo)
    {
        return userInfoMapper.edit(userInfo);
    }

    @Override
    public int positionChange(long userinfoId, long positionId)
    {
        return userInfoMapper.positionChange(userinfoId,positionId);
    }

    @Override
    public int modifyPassword(long userinfoId, String newPassword)
    {
        return userInfoMapper.modifyPassword(userinfoId,newPassword);
    }


    @Override
    public int delete(long userInfoId)
    {
        return userInfoMapper.delete(userInfoId);
    }

}
