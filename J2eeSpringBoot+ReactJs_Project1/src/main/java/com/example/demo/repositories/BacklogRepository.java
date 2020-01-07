package com.example.demo.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.domain.Backlog;

public interface BacklogRepository extends CrudRepository<Backlog,Long> {
    Backlog findByProjectIdentifier(String identifier);
}
