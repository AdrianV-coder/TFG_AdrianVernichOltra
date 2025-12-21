package com.example.templatebackend.user.infrastructure.persistence.jpa.mapper;

import com.example.templatebackend.user.domain.model.User;
import com.example.templatebackend.user.domain.model.UserRecord;
import com.example.templatebackend.user.infrastructure.persistence.jpa.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

  User toModel(UserEntity userEntity);

  UserRecord toModelRecord(UserEntity userEntity);

  @Mapping(target = "habits", ignore = true)
  UserEntity toEntity(User user);

  List<User> toModelList(List<UserEntity> entities);
}
