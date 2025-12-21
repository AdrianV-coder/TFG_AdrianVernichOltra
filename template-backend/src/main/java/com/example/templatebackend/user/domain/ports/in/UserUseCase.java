package com.example.templatebackend.user.domain.ports.in;

import com.example.templatebackend.user.domain.model.User;
import com.example.templatebackend.user.domain.model.UserRecord;

import java.util.List;
import java.util.UUID;

public interface UserUseCase {
  User findById(UUID id);

  UserRecord findByIdRecord(UUID id);

  List<User> findAll();

  User findByUsername(String username);

  User create(User post);

  User update(UUID id,
              User post);

  void delete(UUID id);
}
