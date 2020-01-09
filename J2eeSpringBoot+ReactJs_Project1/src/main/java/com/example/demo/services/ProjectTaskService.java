package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Backlog;
import com.example.demo.domain.Project;
import com.example.demo.domain.ProjectTask;
import com.example.demo.exception.ProjectNotFoundException;
import com.example.demo.repositories.BacklogRepository;
import com.example.demo.repositories.ProjectRepository;
import com.example.demo.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	BacklogRepository backlogRepository;
	@Autowired
	ProjectTaskRepository projectTaskRepository;
	@Autowired
	ProjectRepository projectRepository;
	
	public ProjectTask addProjectTask(String projectIdentifier,ProjectTask projectTask){
		
		try {
			Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
			
			projectTask.setBacklog(backlog);
			
			Integer backlogSequence = backlog.getPTSequence();
			backlogSequence++;
			backlog.setPTSequence(backlogSequence);
			
			projectTask.setProjectSequence(projectIdentifier+"-"+backlogSequence);
			projectTask.setProjectIdentifier(projectIdentifier);
			
			if(projectTask.getStatus()==""||projectTask.getStatus()==null) {
				projectTask.setStatus("TO-DO");
			}
			
			if(projectTask.getPriority()==null) {
				projectTask.setPriority(3);
			}
			
			return projectTaskRepository.save(projectTask);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ProjectNotFoundException("Project Not Found");
		}
		
	} 
	
	public Iterable<ProjectTask> findPTById(String id){
		
		Project project = projectRepository.findByProjectIdentifier(id);
		if(project == null) {
			throw new ProjectNotFoundException("Project Id with "+id+" Does not Exist");
		}
 
    	return projectTaskRepository.findByProjectIdentifierOrderById(id);
    
		
	}
	
	public ProjectTask findPTByProjectSequence(String backlog_id,String pt_sequence) {
		Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_sequence);
		if(backlog == null) {
			throw new ProjectNotFoundException("Project Id with "+backlog_id+" Does not Exist");
		}else if(projectTask == null) {
			throw new ProjectNotFoundException("Project Task with "+pt_sequence+" Does not Exist");
		}else if(!projectTask.getProjectIdentifier().equals(backlog_id)) {
			throw new ProjectNotFoundException("Project Task "+pt_sequence+" does not exist in project "+backlog_id);
		}
		return projectTask;
	}
	
	public ProjectTask updateProjectTask(ProjectTask updatePT,String backlog_id,String pt_sequence) {
		ProjectTask projectTask = findPTByProjectSequence(backlog_id,pt_sequence);
		projectTask = updatePT;
		return projectTaskRepository.save(projectTask);
	}
	public void deleteProjectTask(String backlog_id,String pt_sequence) {
		ProjectTask projectTask2 = findPTByProjectSequence(backlog_id, pt_sequence);
	    projectTaskRepository.delete(projectTask2);
	}
	
}
