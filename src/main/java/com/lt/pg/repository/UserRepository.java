package com.lt.pg.repository;

import com.lt.pg.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long>  {
    public Optional<User> findByUsername(String username);

    public List<User> findByUsernameContaining(String username);

}
