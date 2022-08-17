package com.analysis.words.entity;


import lombok.Data;

/**
 * @author admin
 */
@Data
public class Department {
    
    private long departmentId;	
    private String departmentName;
    private String departmentDesc;
    private int status;		
    private long fid;		
    
}
