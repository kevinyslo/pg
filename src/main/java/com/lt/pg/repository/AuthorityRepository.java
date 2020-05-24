package com.lt.pg.repository;

import com.lt.pg.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, String>  {
}
