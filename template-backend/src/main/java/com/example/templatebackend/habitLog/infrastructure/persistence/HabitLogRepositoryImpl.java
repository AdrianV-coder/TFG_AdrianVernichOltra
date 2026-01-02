package com.example.templatebackend.habitLog.infrastructure.persistence;

import com.example.templatebackend.habit.infrastructure.persistence.jpa.HabitJpaRepository;
import com.example.templatebackend.habit.infrastructure.persistence.jpa.entity.HabitEntity;
import com.example.templatebackend.habitLog.domain.model.HabitLog;
import com.example.templatebackend.habitLog.domain.ports.out.HabitLogRepository;
import com.example.templatebackend.habitLog.infrastructure.persistence.jpa.HabitLogJpaRepository;
import com.example.templatebackend.habitLog.infrastructure.persistence.jpa.mapper.HabitLogMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class HabitLogRepositoryImpl implements HabitLogRepository {

  private final HabitLogJpaRepository jpaRepository;
  private final HabitJpaRepository habitJpaRepository;
  private final HabitLogMapper mapper;

  @Override
  public Optional<HabitLog> findByHabitAndDate(Integer habitId, LocalDate date) {
    return jpaRepository.findByHabit_IdAndDate(habitId, date)
        .map(mapper::toModel);
  }

  @Override
  public List<HabitLog> findByHabit(Integer habitId) {
    return jpaRepository.findByHabit_Id(habitId)
        .stream()
        .map(mapper::toModel)
        .toList();
  }

  @Override
  public List<HabitLog> findByHabitAndRange(Integer habitId, LocalDate start, LocalDate end) {
    return jpaRepository.findByHabit_IdAndDateBetween(habitId, start, end)
        .stream()
        .map(mapper::toModel)
        .toList();
  }

  @Override
  public HabitLog save(HabitLog habitLog) {
    HabitEntity habit = habitJpaRepository.findById(habitLog.getHabitId())
        .orElseThrow();

    var entity = mapper.toEntity(habitLog);
    entity.setHabit(habit);

    return mapper.toModel(jpaRepository.save(entity));
  }

  @Override
  public void deleteById(Integer id) {
    jpaRepository.deleteById(id);
  }
}