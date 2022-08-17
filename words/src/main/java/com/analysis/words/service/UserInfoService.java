package com.analysis.words.service;


import com.analysis.words.entity.UserInfo;

import java.util.List;
import java.util.Map;

/**
 * @author admin
 */
public interface UserInfoService {

    public UserInfo login(String username, String password);

    public List<UserInfo> findAll(Map params);

    public int findTotalSize(String username,String phone);

    public UserInfo findById(Map params);

    public int add(UserInfo userInfo);

    public int edit(UserInfo userInfo);

    public int positionChange(long userinfoId,long positionId);

    public int modifyPassword(long userinfoId,String newPassword);

    public int delete(long userInfoId);

}
