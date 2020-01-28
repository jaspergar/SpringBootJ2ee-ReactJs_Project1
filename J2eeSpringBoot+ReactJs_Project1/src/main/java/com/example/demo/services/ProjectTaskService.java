package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Backlog;
import com.example.demo.domain.ProjectTask;
import com.example.demo.exception.ProjectNotFoundException;
import com.example.demo.repositories.BacklogRepository;
import com.example.demo.repositories.ProjectRepository;
import com.example.demo.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private BacklogRepository backlogRepository;
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private ProjectServices projectServices;
	
	public ProjectTask addProjectTask(String projectIdentifier,ProjectTask projectTask,String username){
		
		
			Backlog backlog = projectServices.findProjectIdentifier(projectIdentifier, username).getBacklog();
			
			projectTask.setBacklog(backlog);
			
			Integer backlogSequence = backlog.getPTSequence();
			backlogSequence++;
			backlog.setPTSequence(backlogSequence);
			
			projectTask.setProjectSequence(projectIdentifier.toUpperCase()+"-"+backlogSequence);
			projectTask.setProjectIdentifier(projectIdentifier.toUpperCase());
			
			if(projectTask.getStatus()==""||projectTask.getStatus()==null) {
				projectTask.setStatus("TO_DO");
			}
			
			if( projectTask.getPriority()==null || projectTask.getPriority()== 0) {
				projectTask.setPriority(3);
			}
			
			return projectTaskRepository.save(projectTask);
		
		
	} 
	
	public Iterable<ProjectTask> findPTById(String id,String username){
		
		projectServices.findProjectIdentifier(id, username);
 
    	return projectTaskRepository.findByProjectIdentifierOrderByPriority(id.toUpperCase());
    
		
	}
//	
	public ProjectTask findPTByProjectSequence(String backlog_id,String pt_sequence,String username) {
		projectServices.findProjectIdentifier(backlog_id, username);
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_sequence.toUpperCase());
		if(projectTask == null) {
			throw new ProjectNotFoundException("Project Task with "+pt_sequence+" Does not Exist");
		}else if(!projectTask.getProjectIdentifier().equals(backlog_id.toUpperCase())) {
			throw new ProjectNotFoundException("Project Task "+pt_sequence+" does not exist in project "+backlog_id);
		}
		return projectTask;
	}
//	
	public ProjectTask updateProjectTask(ProjectTask updatePT,String backlog_id,String pt_sequence,String username) {
		ProjectTask projectTask = findPTByProjectSequence(backlog_id.toUpperCase(),pt_sequence.toUpperCase(),username);
		projectTask = updatePT;
		return projectTaskRepository.save(projectTask);
	}
	public void deleteProjectTask(String backlog_id,String pt_sequence,String username) {
		ProjectTask projectTask2 = findPTByProjectSequence(backlog_id.toUpperCase(), pt_sequence.toUpperCase(),username);
	    projectTaskRepository.delete(projectTask2);
	}
	
}
