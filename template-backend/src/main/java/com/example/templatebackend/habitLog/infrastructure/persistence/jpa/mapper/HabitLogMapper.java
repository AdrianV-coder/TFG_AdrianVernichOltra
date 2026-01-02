package com.example.templatebackend.habitLog.infrastructure.persistence.jpa.mapper;

import com.example.templatebackend.habitLog.domain.model.HabitLog;
import com.example.templatebackend.habitLog.infrastructure.persistence.jpa.entity.HabitLogEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HabitLogMapper {

  @Mapping(target = "habitId", source = "habit.id")
  HabitLog toModel(HabitLogEntity entity);

  @Mapping(target = "habit", ignore = true)
  @Mapping(target = "id", ignore = true)
  HabitLogEntity toEntity(HabitLog model);
}