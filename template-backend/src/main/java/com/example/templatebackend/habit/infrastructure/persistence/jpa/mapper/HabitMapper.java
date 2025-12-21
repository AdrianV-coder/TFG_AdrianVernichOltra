package com.example.templatebackend.habit.infrastructure.persistence.jpa.mapper;

import com.example.templatebackend.habit.domain.model.Habit;
import com.example.templatebackend.habit.domain.model.HabitRecord;
import com.example.templatebackend.habit.infrastructure.persistence.jpa.entity.HabitEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HabitMapper {
  @Mapping(target = "userId", source = "user.id")
  Habit toModel(HabitEntity entity);

  @Mapping(target = "userId", source = "user.id")
  HabitRecord toModelRecord(HabitEntity entity);

  @Mapping(target = "user.id", source = "userId")
  HabitEntity toEntity(Habit habit);

  List<Habit> toModelList(List<HabitEntity> entities);
}
