package com.arabsoft.ChatBoot.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenReposirory extends JpaRepository<Token,Integer> {

    Optional<Token> findByToken(String token);
}
