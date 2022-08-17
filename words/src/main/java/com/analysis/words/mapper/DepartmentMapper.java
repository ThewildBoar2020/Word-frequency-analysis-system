package com.analysis.words.mapper;

import com.analysis.words.entity.Department;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface DepartmentMapper
{
    public List<Department> findAll(@Param("department_name") String departmentName,
                                    @Param("start") Integer start, @Param("limit") Integer limit);

    public Department findById(@Param("department_id") long departmentId);

    public int add(Department department);

    public int edit(Department department);

    public int delete(@Param("department_id") long departmentId);

    public int findTotalSize();
}
