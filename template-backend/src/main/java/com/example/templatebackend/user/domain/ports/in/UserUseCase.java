package com.example.templatebackend.user.domain.ports.in;

import com.example.templatebackend.user.domain.model.User;
import com.example.templatebackend.user.domain.model.UserRecord;

import java.util.List;

public interface UserUseCase {
  User findById(Integer id);

  UserRecord findByIdRecord(Integer id);

  List<User> findAll();

  User findByUsername(String username);

  User create(User post);

  User update(Integer id,
              User post);

  void delete(Integer id);
}
