package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityHandlerException extends ResponseEntityExceptionHandler{

	@ExceptionHandler
	public final ResponseEntity<Object> handlerProjectIdException(ProjectIdException ex,WebRequest request){
		ProjectIdExceptionResponse ExceptionResponse = new ProjectIdExceptionResponse(ex.getMessage());
	  return new ResponseEntity(ExceptionResponse , HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler
	public final ResponseEntity<Object> handlerProjectNotFoundException(ProjectNotFoundException ex,WebRequest request){
		ProjectNotFoundExceptionResponse ExceptionResponse = new ProjectNotFoundExceptionResponse(ex.getMessage());
	  return new ResponseEntity(ExceptionResponse , HttpStatus.BAD_REQUEST);
	}
	
	
}
