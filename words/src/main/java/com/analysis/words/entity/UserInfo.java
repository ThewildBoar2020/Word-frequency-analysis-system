package com.analysis.words.entity;


import lombok.Data;

/**
 * @author admin
 */
@Data
public class UserInfo {
    private long userinfoId;
    private String username;
    private String password;
    private String truename;
    private String phone;
    private String power;
    private int departmentId;
    private int isDeleted;
    private long positionId;
    private Department department;
    private Position position;
}
