package com.example.demo.controller;

import java.security.Principal;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Project;
import com.example.demo.services.MapValidtionError;
import com.example.demo.services.ProjectServices;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

	
	@Autowired
	private ProjectServices projectServices;
	
	@Autowired
	private MapValidtionError mapValidationError;
	
	@PostMapping
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project,BindingResult result,Principal principal){
		//logic
			   
	     ResponseEntity<?> errorMap = mapValidationError.MapValidationService(result);
		 if(errorMap !=null) return errorMap;
	     
		Project project1 = projectServices.saveOrUpdateProject(project,principal.getName());
		return new ResponseEntity<Project>(project1, HttpStatus.CREATED);
	}
	
	@GetMapping("/{projectIdentifier}")
	public ResponseEntity<?> getProjectIdentifier(@PathVariable String projectIdentifier,Principal principal){
		Project project=projectServices.findProjectIdentifier(projectIdentifier,principal.getName());
		return new ResponseEntity<Project>(project,HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public Iterable<Project> getAllProject(Principal principal){
		return projectServices.findAllProject(principal.getName());
	}
	
	@DeleteMapping("/{projectIdentifier}")
	public ResponseEntity<?> deleteProjectByProjectIdentifier(@PathVariable String projectIdentifier,Principal principal){
          projectServices.deleteProjectByIdentifier(projectIdentifier,principal.getName());
          return new ResponseEntity<String>("Project '"+projectIdentifier+"' was successfully deleted.",HttpStatus.OK);
		
	}

	
	

}
