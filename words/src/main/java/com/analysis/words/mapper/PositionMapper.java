package com.analysis.words.mapper;

import com.analysis.words.entity.Position;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface PositionMapper
{
    public List<Position> findAll(@Param("start") Integer start, @Param("limit") Integer limit);

    public Position findById(Long departmentId);

    public int add(Position position);

    public int edit(Position position);

    public int delete(Long departmentId);

    public int findTotalSize();
}
