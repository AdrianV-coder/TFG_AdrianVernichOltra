package com.example.templatebackend.user.infrastructure.persistence;

import com.example.templatebackend.user.domain.model.User;
import com.example.templatebackend.user.domain.model.UserRecord;
import com.example.templatebackend.user.domain.ports.out.UserRepository;
import com.example.templatebackend.user.infrastructure.persistence.jpa.UserJpaRepository;
import com.example.templatebackend.user.infrastructure.persistence.jpa.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

  private final UserJpaRepository userJpaRepository;
  private final UserMapper userMapper;

  @Override
  public Optional<User> findById(Integer id) {
    return userJpaRepository.findById(id)
        .map(userMapper::toModel);
  }

  @Override
  public Optional<UserRecord> findByIdRecord(Integer id) {
    return userJpaRepository.findById(id)
        .map(userMapper::toModelRecord);
  }

  @Override
  public List<User> findAll() {
    return userMapper.toModelList(userJpaRepository.findAll());
  }

  @Override
  public Optional<User> findByUsername(String username) {
    return userJpaRepository.findByUsername(username)
        .map(userMapper::toModel);
  }

  @Override
  public User save(User user) {
    return userMapper.toModel(userJpaRepository.save(userMapper.toEntity(user)));
  }

  @Override
  public User update(Integer id, User user) {
    if (userJpaRepository.findById(id).isEmpty()) {
      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "User with id " + id + " not found"
      );
    }

    user.setId(id);

    return userMapper.toModel(
        userJpaRepository.save(userMapper.toEntity(user))
    );
  }


  @Override
  public void deleteById(Integer id) {
    if (!userJpaRepository.existsById(id)) {
      throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "User with id " + id + " not found"
      );
    }
    userJpaRepository.deleteById(id);
  }
}
