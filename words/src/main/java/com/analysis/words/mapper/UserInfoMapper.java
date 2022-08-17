package com.analysis.words.mapper;


import com.analysis.words.entity.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserInfoMapper
{
    public UserInfo findById(Map params);

    public List<UserInfo> findAll(Map params);

    public int findTotalSize(@Param("username") String username, @Param("phone") String phone);

    public int add(UserInfo userInfo);

    public int edit(UserInfo userInfo);

    public int positionChange(@Param("userinfoId") long userinfoId, @Param("positionId") long positionId);

    public int modifyPassword(@Param("userinfoId") long userinfoId, @Param("newPassword") String newPassword);

    public int delete(Long userInfoId);

    public UserInfo login(@Param("username") String username, @Param("password") String password);
}
