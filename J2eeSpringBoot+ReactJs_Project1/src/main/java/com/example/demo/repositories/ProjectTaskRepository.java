package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.domain.ProjectTask;



public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long>{

	 List<ProjectTask> findByProjectIdentifierOrderById(String id);
	 
	 ProjectTask findByProjectSequence(String sequence);
	 
}
