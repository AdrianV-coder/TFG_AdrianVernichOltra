package com.example.templatebackend.habit.infrastructure.persistence;

import com.example.templatebackend.habit.domain.model.Habit;
import com.example.templatebackend.habit.domain.model.HabitRecord;
import com.example.templatebackend.habit.domain.ports.out.HabitRepository;
import com.example.templatebackend.habit.infrastructure.persistence.jpa.HabitJpaRepository;
import com.example.templatebackend.habit.infrastructure.persistence.jpa.mapper.HabitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class HabitRepositoryImpl implements HabitRepository {
  private final HabitJpaRepository habitJpaRepository;
  private final HabitMapper habitMapper;

  @Override
  public Optional<Habit> findById(Integer id) {
    return habitJpaRepository.findById(id).map(habitMapper::toModel);
  }

  @Override
  public Optional<HabitRecord> findByIdRecord(Integer id) {
    return habitJpaRepository.findById(id).map(habitMapper::toModelRecord);
  }

  @Override
  public List<Habit> findAll() {
    return habitMapper.toModelList(habitJpaRepository.findAll());
  }

  @Override
  public List<Habit> findByUserId(Integer userId) {
    return habitMapper.toModelList(habitJpaRepository.findByUser_Id(userId));
  }

  @Override
  public Habit save(Habit habit) {
    return habitMapper.toModel(habitJpaRepository.save(habitMapper.toEntity(habit)));
  }

  @Override
  public Habit update(Integer id, Habit habit) {
    if (habitJpaRepository.findById(id).isEmpty()) {
      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Habit with id " + id + " not found"
      );
    }
    habit.setId(id);
    return habitMapper.toModel(habitJpaRepository.save(habitMapper.toEntity(habit)));
  }

  @Override
  public void deleteById(Integer id) {
    if (!habitJpaRepository.existsById(id)) {
      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Habit with id " + id + " not found"
      );
    }
    habitJpaRepository.deleteById(id);
  }
}
