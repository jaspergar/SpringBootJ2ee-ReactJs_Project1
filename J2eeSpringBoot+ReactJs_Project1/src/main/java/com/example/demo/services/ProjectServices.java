package com.example.demo.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Project;
import com.example.demo.exception.ProjectIdException;
import com.example.demo.repositories.ProjectRepository;


@Service
public class ProjectServices {
       
	    @Autowired
		private ProjectRepository projectRepository;
	    
	    public Project saveOrUpdateProject(Project project) {
	    	try {
	    		project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
	    		return projectRepository.save(project);
	    	}catch(Exception e) {
	    		throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' is already taken." );
	    	} 
	    	
	    }
	    
	 public Project findProjectIdentifier(String projectIdentifier) {
		 Project project =projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		 if(project ==null) { 
			 throw new ProjectIdException("Project Identifier '"+projectIdentifier+"' Does not exist");
		 }
		 return project;
	 }
	 
	 public Iterable<Project> findAllProject(){
		 Iterable<Project> projectIterable=projectRepository.findAll();
		 return projectIterable;
	 }
	 
	 public void deleteProjectByIdentifier(String ProjectIdentifier) {
		 Project project = projectRepository.findByProjectIdentifier(ProjectIdentifier.toUpperCase());
		 if(project == null) {
			 throw new ProjectIdException("Project Identifier '"+ProjectIdentifier+"' Does not exist");
		 }
       projectRepository.delete(project);
	 }
	
	
}
