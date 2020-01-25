package com.example.demo.controller;

import static com.example.demo.security.SecurityConstants.TOKEN_PREFIX;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Payload.JWTLoginSuccessResponse;
import com.example.demo.Payload.LoginRequest;
import com.example.demo.domain.User;
import com.example.demo.security.JWTTokenProvider;
import com.example.demo.services.MapValidtionError;
import com.example.demo.services.UserService;
import com.example.demo.validator.UserValidator;
@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private MapValidtionError mapValidtionError;
	@Autowired
	private UserService userService;
    @Autowired
    private UserValidator userValidator;
    
    
    @Autowired
    private JWTTokenProvider jWTTokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest,BindingResult result){
    	ResponseEntity<?> errorMap = mapValidtionError.MapValidationService(result);
		if(errorMap != null) return errorMap;
		
		Authentication authentication = authenticationManager.authenticate(
				 new UsernamePasswordAuthenticationToken(
						 loginRequest.getPassword(), 
						 loginRequest.getUsername()
						 )
				 );
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = TOKEN_PREFIX + jWTTokenProvider.generateToken(authentication);
		
		return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
    }
    
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
		
		//validates the password and confirmpassword // password must be atleast 6 char and confirmpassword must match password
		userValidator.validate(user, result);
		
		
		ResponseEntity<?> errorMap = mapValidtionError.MapValidationService(result);
		if(errorMap != null) return errorMap;
		
		User newUser = userService.saveUser(user);
		return new ResponseEntity<User>(newUser,HttpStatus.CREATED);
	}
}
