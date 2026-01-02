package com.example.templatebackend.habit.infrastructure.persistence;

import com.example.templatebackend.habit.domain.model.Habit;
import com.example.templatebackend.habit.domain.model.HabitRecord;
import com.example.templatebackend.habit.domain.ports.out.HabitRepository;
import com.example.templatebackend.habit.infrastructure.persistence.jpa.HabitJpaRepository;
import com.example.templatebackend.habit.infrastructure.persistence.jpa.entity.HabitEntity;
import com.example.templatebackend.habit.infrastructure.persistence.jpa.mapper.HabitMapper;
import com.example.templatebackend.user.infrastructure.persistence.jpa.UserJpaRepository;
import com.example.templatebackend.user.infrastructure.persistence.jpa.entity.UserEntity;
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
  private final UserJpaRepository userJpaRepository;
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
    if (habit.getUserId() == null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "userId is required");
    }

    UserEntity userEntity = userJpaRepository.findById(habit.getUserId())
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "User with id " + habit.getUserId() + " not found"
        ));

    HabitEntity entity = habitMapper.toEntity(habit);

    // ✅ CLAVE
    entity.setUser(userEntity);

    // ✅ CLAVE: evitar null en DB (por si acaso)
    if (entity.getVersion() == null) entity.setVersion(0L);

    HabitEntity saved = habitJpaRepository.save(entity);
    return habitMapper.toModel(saved);
  }

  @Override
  public Habit update(Integer id, Habit habit) {
    HabitEntity existing = habitJpaRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "Habit with id " + id + " not found"
        ));

    // ✅ Actualizamos SOLO lo editable (no tocar user/createdAt/version)
    existing.setName(habit.getName());
    existing.setDescription(habit.getDescription());

    HabitEntity saved = habitJpaRepository.save(existing);
    return habitMapper.toModel(saved);
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
