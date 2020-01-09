package com.example.demo.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.ProjectTask;
import com.example.demo.services.MapValidtionError;
import com.example.demo.services.ProjectTaskService;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
	
	@Autowired 
	ProjectTaskService projectTaskService;
	@Autowired
	MapValidtionError mapValidtionError;
	
	
     @PostMapping("/{backlog_id}")
	public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask,BindingResult result,@PathVariable String backlog_id){
    	 ResponseEntity<?> errorMapEntity = mapValidtionError.MapValidationService(result);
    	 if(errorMapEntity != null) return errorMapEntity;
    	 
    	 ProjectTask projectTask2 = projectTaskService.addProjectTask(backlog_id, projectTask);
    	 
    	 return new ResponseEntity<ProjectTask>(projectTask2,HttpStatus.CREATED);
     }
     
     @GetMapping("/{backlog_id}")
     public Iterable<ProjectTask> getAllPTById(@PathVariable String backlog_id){
    	 return projectTaskService.findPTById(backlog_id);
     }
	
     @GetMapping("/{backlog_id}/{pt_sequence}")
     public ResponseEntity<?> getPTByProjectSequence(@PathVariable String backlog_id,@PathVariable String pt_sequence){
    	  ProjectTask projectTask3 = projectTaskService.findPTByProjectSequence(backlog_id, pt_sequence);
         return new ResponseEntity<ProjectTask>(projectTask3,HttpStatus.OK);
     }
     
     @PatchMapping("/{backlog_id}/{pt_sequence}")
     public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask updatePt,BindingResult result,@PathVariable String backlog_id,@PathVariable String pt_sequence){
    	 ResponseEntity<?> errorMapEntity = mapValidtionError.MapValidationService(result);
    	 if(errorMapEntity != null) return errorMapEntity;
    	 
    	 ProjectTask projectTask = projectTaskService.updateProjectTask(updatePt, backlog_id, pt_sequence);
    	 return new ResponseEntity<ProjectTask>(projectTask,HttpStatus.OK);
     }
     
     @DeleteMapping("/{backlog_id}/{pt_sequence}")
     public ResponseEntity<?> deletePT(@PathVariable String backlog_id,@PathVariable String pt_sequence){
        projectTaskService.deleteProjectTask(backlog_id, pt_sequence);
        return new ResponseEntity<String>("Project Task "+pt_sequence+" has been successfully deleted.",HttpStatus.OK);
     }
     
     }
     
