package com.example.templatebackend.habit.application;

import com.example.templatebackend.habit.domain.model.Habit;
import com.example.templatebackend.habit.domain.model.HabitRecord;
import com.example.templatebackend.habit.domain.ports.in.HabitUseCase;
import com.example.templatebackend.habit.domain.ports.out.HabitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HabitService implements HabitUseCase {
  private final HabitRepository habitRepository;

  @Override
  public Habit findById(Integer id) {
    return habitRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Habit not found by id: " + id));
  }

  @Override
  public HabitRecord findByIdRecord(Integer id) {
    return habitRepository.findByIdRecord(id)
        .orElseThrow(() -> new RuntimeException("HabitRecord not found by id: " + id));
  }

  @Override
  public List<Habit> findAll() {
    return habitRepository.findAll();
  }

  @Override
  public List<Habit> findByUserId(Integer userId) {
    return habitRepository.findByUserId(userId);
  }

  @Override
  public Habit create(Habit habit) {
    return habitRepository.save(habit);
  }

  @Override
  public Habit update(Integer id, Habit habit) {
    return habitRepository.update(id, habit);
  }

  @Override
  public void delete(Integer id) {
    habitRepository.deleteById(id);
  }
}
