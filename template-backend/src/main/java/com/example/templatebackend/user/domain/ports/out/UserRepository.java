package com.example.templatebackend.user.domain.ports.out;

import com.example.templatebackend.user.domain.model.User;
import com.example.templatebackend.user.domain.model.UserRecord;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository {
  Optional<User> findById(UUID id);

  Optional<UserRecord> findByIdRecord(UUID id);

  Optional<User> findByUsername(String username);

  List<User> findAll();

  User save(User post);

  User update(UUID id,
              User post);

  void deleteById(UUID id);
}
