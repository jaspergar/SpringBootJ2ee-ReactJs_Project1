package com.example.demo.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Backlog;
import com.example.demo.domain.Project;
import com.example.demo.domain.User;
import com.example.demo.exception.ProjectIdException;
import com.example.demo.repositories.BacklogRepository;
import com.example.demo.repositories.ProjectRepository;
import com.example.demo.repositories.UserRepository;


@Service
public class ProjectServices {
       
	    @Autowired
		private ProjectRepository projectRepository;
	    
	    @Autowired
	    private BacklogRepository backlogRepository;
	    
	    @Autowired
	    private UserRepository userRepository;
	    
	    private Long id;
	    public Project saveOrUpdateProject(Project project,String username) {
	    	
	    	try {
	    		
	    		User user = userRepository.findByUsername(username);
	    		project.setUser(user);
	    		project.setProjectLeader(user.getUsername());
//	    		
	    		project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
	    	
	    		//create Project Creating Backlog
	    		if( project.getId()==null) {
	    			Backlog backlog = new Backlog();
	    			project.setBacklog(backlog);
	    			backlog.setProject(project);
	    			backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
	    		}
	    		//update project Retrieving Backlog
	    		if(project.getId() != null) {
	    			project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
	    		}
	    			 
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
